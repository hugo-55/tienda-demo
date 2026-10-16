'use client';
import { useState } from 'react';
import WhatsAppButton from '../../components/WhatsAppButton';
import LeadCTA from '../../components/LeadCTA';
import Pricing from '../../components/Pricing';
import { waLink } from '../../lib/site';

const STEPS_DONE = ['📥 Pedido recibido', '💾 Guardado en planilla', '🔔 Aviso al dueño'];

export default function Automatizacion() {
  const [name, setName] = useState('');
  const [product, setProduct] = useState('Yerba mate 1 kg');
  const [qty, setQty] = useState(2);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState(null);
  const [log, setLog] = useState([]);

  function pushLog(msgs) {
    const t = new Date().toLocaleTimeString('es-CL');
    setLog((l) => [...l, ...msgs.map((m) => `${t} — ${m}`)]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert('Escribe tu nombre para probar la demo');
    setSending(true);
    setSent(false);
    setLog([]);
    pushLog(['⏳ Enviando pedido al sistema...']);
    try {
      const r = await fetch('/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, product, qty }),
      });
      const data = await r.json();
      if (!data.ok && !data.row) throw new Error(data.error || 'Error desconocido');
      setSent(true);
      const live = data.sheetMode === 'live' && data.notifyMode === 'live';
      setMode(live ? 'live' : data.sheetMode === 'live' || data.notifyMode === 'live' ? 'partial' : 'demo');
      pushLog([
        `📥 Pedido recibido: ${qty} x ${product} (cliente: ${name})`,
        data.sheetMode === 'live'
          ? '💾 Guardado REAL en tu Google Sheet → hoja "Pedidos"'
          : '💾 [MODO DEMO] Se guardaría en Google Sheets → hoja "Pedidos"',
        data.notifyMode === 'live'
          ? `🔔 WhatsApp REAL enviado a tu celular: "Nuevo pedido de ${name}"`
          : `🔔 [MODO DEMO] WhatsApp automático al dueño: "Nuevo pedido de ${name}"`,
        live
          ? '✅ Flujo completo en vivo. Revisa tu planilla y tu WhatsApp.'
          : 'ℹ️ Activa planilla y avisos (guías abajo) para el flujo 100% real.',
      ]);
    } catch (err) {
      pushLog([`❌ No se pudo registrar: ${err.message}. Intenta de nuevo.`]);
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setSent(false);
    setMode(null);
    setLog([]);
  }

  const waText = `Hola, soy ${name || '...'}. Quiero pedir: ${qty} x ${product}`;
  const waHref = waLink(waText);

  return (
    <div>
      <div className="topbar">
        <div className="topbar-inner">
          <span className="logo">⚙️ Demo Automatización</span>
          <nav className="nav"><a href="/">Tienda</a><a href="/automatizacion">Automatización</a><a href="/stock">Stock</a></nav>
        </div>
      </div>
      <div className="container">
        <h1>Del formulario al WhatsApp, sin copiar nada a mano</h1>
        <p>
          <strong>El problema:</strong> hoy el pedido llega por un lado, lo copias a
          Excel por otro y a veces se pierde. <strong>La solución:</strong> el cliente
          llena 3 campos y el sistema hace el resto: guarda en planilla y te avisa.
        </p>

        <h2 className="section-title">El recorrido de un pedido (mira cómo se enciende)</h2>
        <div className="flow">
          <span className={`flow-box ${sent ? 'done' : ''}`}>1. Cliente envía ⇢</span>
          <span className="flow-arrow">→</span>
          <span className={`flow-box ${sent ? 'done' : ''}`}>2. Se guarda solo ⇢</span>
          <span className="flow-arrow">→</span>
          <span className={`flow-box ${sent ? 'done' : ''}`}>3. Te avisa ⇢</span>
          <span className="flow-arrow">→</span>
          <span className={`flow-box ${sent ? 'done' : ''}`}>4. Vendes ✅</span>
        </div>

        <div className="card">
          <h3>Pruébalo tú mismo (30 segundos)</h3>
          <form onSubmit={handleSubmit}>
            <label>1. Tu nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. María" />
            <label>2. Producto</label>
            <select value={product} onChange={(e) => setProduct(e.target.value)}>
              <option>Yerba mate 1 kg</option><option>Café molido 500 g</option><option>Azúcar 1 kg</option><option>Aceite vegetal 900 ml</option>
            </select>
            <label>3. Cantidad</label>
            <input type="number" min="1" max="99" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
            <button className="btn" type="submit" disabled={sending}>{sending ? 'Enviando...' : 'Enviar pedido'}</button>{' '}
            <button className="btn btn-outline" type="button" onClick={reset}>Limpiar</button>
          </form>
          {mode === 'live' && <p><span className="badge">🟢 EN VIVO — planilla + aviso reales</span></p>}
          {mode === 'partial' && <p><span className="badge badge-warn">🟡 PARCIAL — una parte real, otra demo</span></p>}
          {mode === 'demo' && <p><span className="badge badge-warn">🟡 MODO DEMO — activa planilla y avisos abajo</span></p>}
          {sent && (
            <p><strong>✅ ¡Pedido registrado!</strong> Abajo ves exactamente qué haría el sistema real. Y si fuera de verdad, ya tendrías el aviso en tu celular.</p>
          )}
          <p><a className="btn btn-green" href={waHref} target="_blank">O envíalo real por WhatsApp</a></p>
        </div>

        <div className="card">
          <h3>Registro del sistema (esto lo ve el dueño)</h3>
          <div className="log">{log.length ? log.join('\n') : 'Aún no hay pedidos. Completa el formulario de arriba y aprieta Enviar.'}</div>
          <p className="muted">En el trabajo real esto se conecta a Google Sheets + Make/n8n. Aquí se simula para que veas el resultado antes de pagar.</p>
        </div>

        <div className="card">
          <h3>¿Qué recibes al contratarlo?</h3>
          <ul className="check">
            <li>✅ Formulario a medida con tus productos</li>
            <li>✅ Planilla ordenada con fecha, cliente y total</li>
            <li>✅ Aviso automático a tu WhatsApp/correo</li>
            <li>✅ Video de 5 min: cómo usarlo y modificar precios</li>
          </ul>
        </div>

        <div className="card">
          <h3>Activar flujo real (una vez)</h3>
          <p className="muted">Hoy está en modo demo. <strong>Planilla:</strong> guía <strong>SHEETS-SETUP.md</strong> (5 min) → URL en <strong>lib/site.js → SHEET_ENDPOINT</strong>. <strong>Avisos WhatsApp:</strong> guía <strong>NOTIFY-SETUP.md</strong> (10 min) → URL en <strong>NOTIFY_ENDPOINT</strong>. Sin cambiar nada más, el cartel pasa a 🟢 EN VIVO.</p>
        </div>

        <Pricing />
        <LeadCTA context="demo de automatización" />

        <WhatsAppButton />
      </div>
    </div>
  );
}
