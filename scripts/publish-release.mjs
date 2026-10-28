import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function getGitHubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN.trim();
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^GITHUB_TOKEN\s*=\s*(.*)$/);
      if (match) return match[1].trim();
    }
  }
  return '';
}

const GITHUB_TOKEN = getGitHubToken();
const REPO_OWNER = 'Uncensored-dev';
const REPO_NAME = 'Azaad';

const APK_PATH = path.join(
  ROOT_DIR,
  'android',
  'app',
  'build',
  'outputs',
  'apk',
  'release',
  'app-release.apk'
);

async function main() {
  if (!fs.existsSync(APK_PATH)) {
    console.error(`❌ Release APK not found at: ${APK_PATH}`);
    console.error(`Please compile first using: npm run build:android or .\\gradlew.bat assembleRelease`);
    process.exit(1);
  }

  const apkStats = fs.statSync(APK_PATH);
  const sizeMb = (apkStats.size / (1024 * 1024)).toFixed(2);
  console.log(`📦 Found APK: ${APK_PATH} (${sizeMb} MB)`);

  const appJsonPath = path.join(ROOT_DIR, 'app.json');
  let appVersion = '1.0.0';
  if (fs.existsSync(appJsonPath)) {
    try {
      const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
      if (appJson.expo && appJson.expo.version) {
        appVersion = appJson.expo.version;
      }
    } catch {
      // ignore
    }
  }

  const tag = `v${appVersion}`;
  const releaseTitle = `AZAAD v${appVersion} - Uncensored Truth Archive`;
  const releaseBody = `### AZAAD Mobile Release (${tag})
- **Application**: AZAAD Anti-Censorship Investigative Archive
- **Package**: \`org.azaad.archive\`
- **Architecture**: Universal arm64-v8a Android APK
- **Security & Privacy**: Zero Google Analytics, zero trackers, decentralized Cloudflare submission relay
- **Features**: Live disguise system, camouflage decoy music visualizer, dynamic mirror sync

#### Direct APK Download:
- **File**: \`AZAAD-${tag}.apk\` (${sizeMb} MB)
`;

  console.log(`🚀 Checking existing releases on GitHub: ${REPO_OWNER}/${REPO_NAME}...`);

  // Check if release with this tag already exists
  let releaseId = null;
  let uploadUrl = null;

  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/tags/${tag}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Azaad-AutoRelease-Agent',
        },
      }
    );

    if (getRes.ok) {
      const existing = await getRes.json();
      releaseId = existing.id;
      uploadUrl = existing.upload_url;
      console.log(`ℹ️ Release ${tag} already exists (id: ${releaseId}).`);
    }
  } catch (err) {
    console.warn('Tag lookup check:', err.message);
  }

  // Create release if not found
  if (!releaseId) {
    console.log(`✨ Creating GitHub Release: ${tag}...`);
    const createRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Azaad-AutoRelease-Agent',
        },
        body: JSON.stringify({
          tag_name: tag,
          target_commitish: 'main',
          name: releaseTitle,
          body: releaseBody,
          draft: false,
          prerelease: false,
        }),
      }
    );

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error(`❌ Failed to create release: HTTP ${createRes.status}\n${errText}`);
      process.exit(1);
    }

    const created = await createRes.json();
    releaseId = created.id;
    uploadUrl = created.upload_url;
    console.log(`✅ Created GitHub Release: ${created.html_url}`);
  }

  // Check if asset already exists in release
  const assetName = `AZAAD-${tag}.apk`;
  const uploadEndpoint = uploadUrl.replace(/\{(\?.*)?\}/, `?name=${encodeURIComponent(assetName)}`);

  console.log(`⬆️ Uploading APK asset '${assetName}' (${sizeMb} MB)...`);
  const apkBuffer = fs.readFileSync(APK_PATH);

  // If asset already exists, delete it first to overwrite
  try {
    const listRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/${releaseId}/assets`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Azaad-AutoRelease-Agent',
        },
      }
    );
    if (listRes.ok) {
      const assets = await listRes.json();
      const existingAsset = assets.find((a) => a.name === assetName);
      if (existingAsset) {
        console.log(`Replacing existing asset ${assetName} (id: ${existingAsset.id})...`);
        await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/assets/${existingAsset.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json',
              'User-Agent': 'Azaad-AutoRelease-Agent',
            },
          }
        );
      }
    }
  } catch (e) {
    console.warn('Asset deduplication check:', e.message);
  }

  // Upload asset
  const uploadRes = await fetch(uploadEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Length': apkBuffer.length.toString(),
      'User-Agent': 'Azaad-AutoRelease-Agent',
    },
    body: apkBuffer,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    console.error(`❌ Asset upload failed: HTTP ${uploadRes.status}\n${errText}`);
    process.exit(1);
  }

  const assetData = await uploadRes.json();
  console.log(`🎉 Success! Release APK published at:`);
  console.log(`   Direct Download: ${assetData.browser_download_url}`);
  console.log(`   Release Page: https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/${tag}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
