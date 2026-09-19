exports.handler = async (event) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const siteUrl = process.env.URL || "https://decale3-fecamp.netlify.app";
  const redirectUri = `${siteUrl}/callback`;

  if (!clientId) {
    return {
      statusCode: 500,
      body: "Missing OAUTH_CLIENT_ID environment variable.",
    };
  }

  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
    state,
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      "Cache-Control": "no-cache",
    },
    body: "",
  };
};
