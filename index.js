export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        app: "DRACO SIGNALS",
        providerConfigured: Boolean(env.QUANTEX_API_BASE && env.QUANTEX_API_KEY),
        mode: "not-connected"
      }, { headers: corsHeaders() });
    }

    if (url.pathname === "/api/signal" && request.method === "GET") {
      // IMPORTANT:
      // This endpoint intentionally does not guess QUANTEX API paths or payloads.
      // Once you provide the official provider API docs/endpoint schema, implement
      // the authenticated request here. Keep QUANTEX_API_KEY as a Worker secret.
      if (!env.QUANTEX_API_BASE || !env.QUANTEX_API_KEY) {
        return Response.json({
          ok: false,
          status: "not_configured",
          message: "Provider credentials are not configured on the server."
        }, { status: 503, headers: corsHeaders() });
      }
      return Response.json({
        ok: false,
        status: "adapter_required",
        message: "Credentials are present, but the official QUANTEX signal endpoint and response schema must be verified before enabling live signals."
      }, { status: 501, headers: corsHeaders() });
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ ok: false, message: "Not found" }, { status: 404, headers: corsHeaders() });
    }

    return env.ASSETS.fetch(request);
  }
};

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };
}
