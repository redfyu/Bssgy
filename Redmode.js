export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Max-Age': '86400',
      }});
    }
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    const resp = await fetch(target, {
      method: 'POST',
      headers: { 'Authorization': request.headers.get('Authorization'), 'Content-Type': 'application/json' },
      body: await request.text(),
    });
    return new Response(await resp.text(), { status: resp.status, headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }});
  }
}
