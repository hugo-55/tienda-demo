import { SHEET_ENDPOINT } from '../../../lib/site';

// POST { name, product, qty } → guarda en Sheets si hay endpoint, si no simula.
// Así la demo funciona hoy y en producción sin cambiar código.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }
  const { name = '', product = '', qty = 1 } = body;
  if (!String(name).trim() || !String(product).trim()) {
    return Response.json({ ok: false, error: 'Faltan datos' }, { status: 400 });
  }
  const row = {
    fecha: new Date().toISOString(),
    nombre: String(name).slice(0, 80),
    producto: String(product).slice(0, 80),
    cantidad: Math.max(1, Math.min(99, Number(qty) || 1)),
  };

  if (!SHEET_ENDPOINT) {
    return Response.json({ ok: true, mode: 'demo', row });
  }
  try {
    const r = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });
    if (!r.ok) throw new Error(`Sheets respondió ${r.status}`);
    return Response.json({ ok: true, mode: 'live', row });
  } catch (e) {
    return Response.json({ ok: true, mode: 'demo-fallback', row, warning: String(e.message || e) });
  }
}
