'use client';
import { useState } from 'react';
import WhatsAppButton from '../../components/WhatsAppButton';

export default function Automatizacion() {
  const [name, setName] = useState('');
  const [product, setProduct] = useState('Yerba 1kg');
  const [qty, setQty] = useState(1);
  const [log, setLog] = useState([]);

  function pushLog(msg) {
    setLog((l) => [...l, `${new Date().toLocaleTimeString('es-AR')} — ${msg}`]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return alert('Poné tu nombre');
    pushLog(`📥 Pedido recibido: ${qty} x ${product} (${name})`);
    pushLog('💾 Guardado en Sheets: hoja "Pedidos" fila +1');
    pushLog('🔔 Aviso WhatsApp al dueño: "Nuevo pedido, responder en <15 min"');
    pushLog('✅ Cliente ve confirmación inmediata (esta pantalla)');
  }

  const waText = `Hola, soy ${name || '...'}. Quiero pedir: ${qty} x ${product}`;
  const waHref = `https://wa.me/56963127779?text=${encodeURIComponent(waText)}`;

  return (
    <div className="container">
      <div className="header">
        <strong>Demo Automatización</strong>
        <nav className="nav"><a href="/">Tienda</a><a href="/automatizacion">Automatización</a><a href="/stock">Stock</a></nav>
      </div>
      <h1>Formulario → Sheets → WhatsApp</h1>
      <p>En producción se conecta a Google Sheets / Make / n8n. Aquí se simula el log para mostrar al cliente qué pasa tras cada pedido.</p>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Tu nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Hugo" />
          <label>Producto</label>
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            <option>Yerba 1kg</option><option>Café 500g</option><option>Azúcar 1kg</option><option>Aceite 900ml</option>
          </select>
          <label>Cantidad</label>
          <input type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
          <button className="btn" type="submit">Enviar pedido (simulado)</button>{' '}
          <a className="btn btn-green" href={waHref} target="_blank">Enviar real por WhatsApp</a>
        </form>
      </div>
      <div className="card">
        <strong>Log del flujo</strong>
        <div className="log">{log.length ? log.join('\n') : 'Sin eventos todavía. Enviá un pedido.'}</div>
      </div>
      <WhatsAppButton />
    </div>
  );
}
