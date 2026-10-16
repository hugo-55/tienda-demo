'use client';
import { useState } from 'react';
import { PHONE_DISPLAY, waLink } from '../lib/site';

// Mismo CTA en las 3 demos: formulario corto que arma el WhatsApp.
// Sin backend: el mensaje llega redactado a tu celular.
export default function LeadCTA({ title = 'Cotiza tu caso por WhatsApp', context = 'demo' }) {
  const [name, setName] = useState('');
  const [biz, setBiz] = useState('Almacén / tienda');
  const [need, setNeed] = useState('Mejorar mi web');

  const msg = `Hola, soy ${name || '...'}. Tengo un ${biz} y necesito: ${need}. Vi la ${context} y quiero cotizar.`;
  return (
    <div className="card" style={{ border: '2px solid #16a34a' }}>
      <h3>{title}</h3>
      <p className="muted">Completa 3 campos y se abre WhatsApp con tu mensaje listo. Respondo el mismo día hábil.</p>
      <label>Tu nombre</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Hugo" />
      <label>Tu negocio</label>
      <select value={biz} onChange={(e) => setBiz(e.target.value)}>
        <option>Almacén / tienda</option>
        <option>Restaurante / café</option>
        <option>Clínica / consulta</option>
        <option>Distribuidora</option>
        <option>Otro</option>
      </select>
      <label>¿Qué necesitas?</label>
      <select value={need} onChange={(e) => setNeed(e.target.value)}>
        <option>Mejorar mi web</option>
        <option>Automatizar pedidos</option>
        <option>Controlar stock</option>
        <option>Todo (pack completo)</option>
      </select>
      <a className="btn btn-green" href={waLink(msg)} target="_blank">
        Enviar por WhatsApp ({PHONE_DISPLAY})
      </a>
      <p className="muted">🛡️ Garantía: 7 días de ajustes incluidos o devuelvo tu pago.</p>
    </div>
  );
}
