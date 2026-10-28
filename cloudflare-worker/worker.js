/**
 * AZAAD Decentralized Relay & Easy Web Downloader
 * Deploy on free Cloudflare Workers
 */

const LATEST_APK_URL =
  "https://github.com/Uncensored-dev/Azaad/releases/download/v1.0.0/AZAAD-v1.0.0.apk";
const GITHUB_REPO_URL = "https://github.com/Uncensored-dev/Azaad";

const LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AZAAD — Censorship-Resilient Documentary Archive</title>
  <meta name="description" content="Download AZAAD Android APK: Decentralized, unblockable public access to investigative journalism and documentaries.">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0A0A0E;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: rgba(229, 9, 20, 0.15);
      color: #EF4444;
      border: 1px solid rgba(229, 9, 20, 0.35);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      margin-bottom: 16px;
      text-transform: uppercase;
    }
    .emblem {
      font-size: 48px;
      margin-bottom: 12px;
      filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.3));
    }
    h1 {
      font-size: 32px;
      font-weight: 900;
      color: #FFFFFF;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #94A3B8;
      font-size: 14px;
      max-width: 440px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .download-card {
      background: #14141E;
      border: 1px solid #242434;
      border-radius: 16px;
      padding: 24px;
      max-width: 420px;
      width: 100%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      margin-bottom: 24px;
    }
    .btn-download {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #22C55E;
      color: #052E16;
      text-decoration: none;
      font-size: 16px;
      font-weight: 800;
      padding: 14px 20px;
      border-radius: 10px;
      transition: all 0.2s ease;
      margin-bottom: 16px;
      box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
    }
    .btn-download:hover {
      background: #16A34A;
      transform: translateY(-1px);
    }
    .meta-tag {
      color: #64748B;
      font-size: 11px;
      margin-bottom: 16px;
    }
    .qr-box {
      background: #FFFFFF;
      padding: 12px;
      border-radius: 12px;
      display: inline-block;
      margin: 10px 0;
    }
    .qr-box img {
      display: block;
      width: 160px;
      height: 160px;
    }
    .qr-caption {
      color: #94A3B8;
      font-size: 11px;
      margin-top: 6px;
    }
    .steps {
      text-align: left;
      background: #0D0D14;
      border: 1px solid #1E1E2C;
      border-radius: 10px;
      padding: 14px 18px;
      margin-top: 16px;
    }
    .steps h3 {
      font-size: 12px;
      color: #F59E0B;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .steps ol {
      padding-left: 18px;
      color: #CBD5E1;
      font-size: 12px;
      line-height: 1.6;
    }
    .links-row {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    .links-row a {
      color: #60A5FA;
      text-decoration: none;
      font-size: 12px;
      font-weight: 600;
    }
    .links-row a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="emblem">🦇</div>
  <div class="badge">Uncensored Truth Archive</div>
  <h1>AZAAD</h1>
  <p class="subtitle">Decentralized, censorship-resilient investigative documentary streaming app. Free, open-source, and zero trackers.</p>

  <div class="download-card">
    <a href="${LATEST_APK_URL}" class="btn-download">
      <span>📲</span>
      <span>Download AZAAD APK (v1.0.0)</span>
    </a>
    <div class="meta-tag">Android 7.0+ • 21.9 MB • No Google Play Needed</div>

    <div class="qr-box">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
        LATEST_APK_URL
      )}" alt="Scan to Download">
    </div>
    <div class="qr-caption">Scan with your phone camera to download directly</div>

    <div class="steps">
      <h3>Quick Install Guide:</h3>
      <ol>
        <li>Tap <b>Download</b> above (or scan QR).</li>
        <li>Open the downloaded APK file.</li>
        <li>Tap <b>Allow from this source</b> if prompted, then <b>Install</b>.</li>
      </ol>
    </div>
  </div>

  <div class="links-row">
    <a href="${GITHUB_REPO_URL}" target="_blank">GitHub Repository</a>
    <span>•</span>
    <a href="${GITHUB_REPO_URL}/releases" target="_blank">All Releases</a>
  </div>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();

    // Direct APK redirect (Short link: /apk or /download)
    if (request.method === "GET") {
      if (
        pathname === "/apk" ||
        pathname === "/download/apk" ||
        pathname === "/app-release.apk" ||
        pathname === "/azaad.apk"
      ) {
        return Response.redirect(LATEST_APK_URL, 302);
      }

      // Real-time Content Proxy (Zero-cache dynamic JSON for instant mobile updates)
      if (pathname === "/content.json" || pathname === "/content") {
        try {
          const contentRes = await fetch(
            `https://raw.githubusercontent.com/Uncensored-dev/Azaad/main/content.json?nocache=${Date.now()}`,
            {
              headers: {
                "User-Agent": "Azaad-Relay",
                "Cache-Control": "no-cache",
              },
            }
          );
          if (contentRes.ok) {
            const jsonText = await contentRes.text();
            return new Response(jsonText, {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Cache-Control": "no-store, no-cache, must-revalidate",
                ...corsHeaders,
              },
            });
          }
        } catch (e) {
          // fallback
        }
      }

      // Serve web download landing page
      return new Response(LANDING_HTML, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...corsHeaders,
        },
      });
    }

    // Community Video Submission Relay (POST)
    if (request.method === "POST") {
      try {
        const data = await request.json();
        const { title, seriesId, embedUrl, description, submitter, duration } = data;

        if (!title || !title.trim()) {
          return new Response(
            JSON.stringify({ error: "Video title is required." }),
            { status: 400, headers: corsHeaders }
          );
        }

        if (!embedUrl || !embedUrl.trim().startsWith("https://")) {
          return new Response(
            JSON.stringify({ error: "A valid HTTPS embed URL is required." }),
            { status: 400, headers: corsHeaders }
          );
        }

        const cleanTitle = title.trim();
        const cleanUrl = embedUrl.trim();
        const cleanSeries = seriesId || "community-vault";
        const cleanDesc = (description || "").trim();
        const cleanSubmitter = (submitter || "Anonymous Whistleblower").trim();

        const issuePayload = {
          title: `[Submission] ${cleanTitle}`,
          labels: ["community-submission", "pending-review"],
          body: `### 🛡️ Community Truth Submission

A user submitted an investigative mirror for archival review.

\`\`\`json
${JSON.stringify(
  {
    title: cleanTitle,
    seriesId: cleanSeries,
    embedUrl: cleanUrl,
    description: cleanDesc,
    duration: duration || "Full Video",
    submitter: cleanSubmitter,
    submittedAt: new Date().toISOString(),
  },
  null,
  2
)}
\`\`\`

---
*To approve and automatically sync this video into the live mobile app, simply apply the label **\`approved\`** to this issue.*
`,
        };

        const ghResponse = await fetch(
          `https://api.github.com/repos/${env.GITHUB_REPO || "Uncensored-dev/Azaad"}/issues`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.GITHUB_TOKEN}`,
              "User-Agent": "Azaad-Relay/1.0",
              Accept: "application/vnd.github+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(issuePayload),
          }
        );

        if (!ghResponse.ok) {
          const errText = await ghResponse.text();
          return new Response(
            JSON.stringify({ error: "GitHub API rejection", details: errText }),
            { status: 502, headers: corsHeaders }
          );
        }

        const issueData = await ghResponse.json();

        return new Response(
          JSON.stringify({
            success: true,
            message: "Submission sent securely via relay. Thank you for protecting the truth.",
            issueNumber: issueData.number,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message || "Internal Relay Error" }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: corsHeaders,
    });
  },
};
