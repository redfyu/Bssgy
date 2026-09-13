export default {
  async fetch(request) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const u = new URL(request.url);
    let target = u.searchParams.get('url');
    if (!target) return new Response('Missing ?url=', { status: 400, headers: cors });
    try {
      const headers = new Headers(request.headers);
      headers.set('Host', new URL(target).host);
      const resp = await fetch(target, { method: request.method, headers, body: ['GET','HEAD'].includes(request.method) ? undefined : request.body });
      const h = new Headers(resp.headers);
      Object.entries(cors).forEach(([k,v]) => h.set(k,v));
      return new Response(resp.body, { status: resp.status, headers: h });
    } catch (e) {
      return new Response('Proxy error: ' + e.message, { status: 502, headers: cors });
    }
  }
};
