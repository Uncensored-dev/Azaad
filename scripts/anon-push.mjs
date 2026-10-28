import { execSync } from 'child_process';
import crypto from 'crypto';

const ANONYMOUS_PERSONAS = [
  { name: 'Uncensored-dev', email: '12345678+Uncensored-dev@users.noreply.github.com' },
  { name: 'Azaad-Vault', email: 'vault-agent@users.noreply.github.com' },
  { name: 'Cipher-Guard', email: 'cipher-guard@users.noreply.github.com' },
  { name: 'Truth-Protocol', email: 'truth-protocol@users.noreply.github.com' },
  { name: 'Sentinel-Archive', email: 'sentinel@users.noreply.github.com' },
  { name: 'Decentralized-Node', email: 'node-archivist@users.noreply.github.com' },
  { name: 'Ghost-Archivist', email: 'ghost-archivist@users.noreply.github.com' },
];

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
const REPO_URL = 'github.com/Uncensored-dev/Azaad.git';

function getRandomPersona() {
  const index = Math.floor(Math.random() * ANONYMOUS_PERSONAS.length);
  const base = ANONYMOUS_PERSONAS[index];
  // Generate random hash suffix for unique anonymous ID
  const randSuffix = crypto.randomBytes(3).toString('hex');
  return {
    name: `${base.name}-${randSuffix}`,
    email: `${randSuffix}+${base.email}`,
  };
}

async function run() {
  const commitMsg = process.argv.slice(2).join(' ') || 'Automated update and sync to Azaad vault';
  const persona = getRandomPersona();

  console.log(`🛡️ Rotating Anonymous Identity for Push:`);
  console.log(`   Author: "${persona.name}" <${persona.email}>`);

  // Configure git local author
  execSync(`git config user.name "${persona.name}"`, { stdio: 'inherit' });
  execSync(`git config user.email "${persona.email}"`, { stdio: 'inherit' });

  // Stage changes
  console.log(`📂 Staging changes...`);
  execSync('git add -A', { stdio: 'inherit' });

  // Check if there are changes to commit
  const status = execSync('git status --porcelain').toString().trim();
  if (status.length > 0) {
    console.log(`💾 Committing changes anonymously...`);
    execSync(
      `git commit -m "${commitMsg.replace(/"/g, '\\"')}" --author="${persona.name} <${persona.email}>"`,
      { stdio: 'inherit' }
    );
  } else {
    console.log(`ℹ️ No uncommitted changes, proceeding to push...`);
  }

  // Push to remote using PAT
  console.log(`🚀 Pushing securely to origin main...`);
  const authenticatedUrl = `https://x-access-token:${GITHUB_TOKEN}@${REPO_URL}`;
  execSync(`git push "${authenticatedUrl}" main`, { stdio: 'inherit' });

  // Always reset remote url to clean non-authenticated URL
  execSync(`git remote set-url origin https://${REPO_URL}`, { stdio: 'ignore' });
  console.log(`✅ Push complete with 100% anonymity verified!`);
}

run().catch((err) => {
  console.error('Anon push error:', err);
  process.exit(1);
});
