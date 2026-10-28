/**
 * DocuStream / VigilStream Community Video Submission Relay
 * Deploy on free Cloudflare Workers (100,000 requests/day free tier)
 *
 * Environment Secrets required in Cloudflare Worker Settings -> Variables:
 * - GITHUB_TOKEN: Personal Access Token (with repo / issues permission)
 * - GITHUB_REPO: "your-github-username/your-repo-name"
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed. Use POST." }),
        { status: 405, headers: corsHeaders }
      );
    }

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
        `https://api.github.com/repos/${env.GITHUB_REPO}/issues`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
            "User-Agent": "VigilStream-Relay/1.0",
            "Accept": "application/vnd.github+json",
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
  },
};
