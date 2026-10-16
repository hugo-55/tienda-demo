import { SHEET_ENDPOINT, NOTIFY_ENDPOINT, NOTIFY_TO } from '../../../lib/site';

// POST { name, product, qty } → guarda en Sheets + avisa por WhatsApp.
// Sin endpoints = modo demo. Con endpoints = flujo real end-to-end.
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
  const cleanQty = Math.max(1, Math.min(99, Number(qty) || 1));
  const row = {
    fecha: new Date().toISOString(),
    nombre: String(name).slice(0, 80),
    producto: String(product).slice(0, 80),
    cantidad: cleanQty,
  };

  let sheetMode = 'demo';
  if (SHEET_ENDPOINT) {
    try {
      const r = await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
      });
      if (!r.ok) throw new Error(`Sheets respondió ${r.status}`);
      sheetMode = 'live';
    } catch (e) {
      sheetMode = `demo-fallback (Sheets: ${e.message})`;
    }
  }

  let notifyMode = 'demo';
  if (NOTIFY_ENDPOINT) {
    try {
      const r = await fetch(NOTIFY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: NOTIFY_TO,
          message: `🔔 Nuevo pedido: ${cleanQty} x ${row.producto} — ${row.nombre}. Responder en <15 min.`,
        }),
      });
      if (!r.ok) throw new Error(`Avisador respondió ${r.status}`);
      notifyMode = 'live';
    } catch (e) {
      notifyMode = `demo-fallback (aviso: ${e.message})`;
    }
  }

  return Response.json({ ok: true, sheetMode, notifyMode, row });
}
