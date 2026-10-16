import WhatsAppButton from '../components/WhatsAppButton';
import LeadCTA from '../components/LeadCTA';
import Pricing from '../components/Pricing';
import { Logo, default as ProductArt } from '../components/Brand';
import { waLink, PAGESPEED_URL } from '../lib/site';

const PRODUCTS = [
  { id: 'yerba-1kg', name: 'Yerba mate 1 kg', price: 4990, desc: 'El clásico de todos los días.' },
  { id: 'cafe-500g', name: 'Café molido 500 g', price: 7990, desc: 'Tostado medio, ideal filtro.' },
  { id: 'azucar-1kg', name: 'Azúcar 1 kg', price: 1990, desc: 'Para la casa o el negocio.' },
  { id: 'aceite-900ml', name: 'Aceite vegetal 900 ml', price: 3490, desc: 'Rinde y no se agota.' },
];

const fmt = (n) => `$${n.toLocaleString('es-CL')}`;

export default function Home() {
  return (
    <div>
      <div className="topbar">
        <div className="topbar-inner">
          <Logo />
          <nav className="nav">
            <a href="/">Tienda</a>
            <a href="/automatizacion">Automatización</a>
            <a href="/stock">Stock</a>
          </nav>
        </div>
      </div>
      <div className="container">
        <div className="hero">
          <span className="badge badge-dark">⚡ Carga en menos de 1 segundo</span>
          <span className="badge badge-dark">📱 Se ve bien en celular</span>
          <span className="badge badge-dark">💬 Pedido por WhatsApp</span>
          <h1>Tu almacén abierto 24/7: el cliente pide en 30 segundos</h1>
          <p>
            Esta es una <strong>demo de portfolio</strong>: muestra cómo queda una web de
            negocio después de una mejora profesional. Antes tardaba 8 segundos y el
            formulario no llegaba a ningún lado. Ahora es rápida y cada pedido cae
            directo a tu WhatsApp.
          </p>
          <div className="hero-cta">
            <a className="btn btn-white" href="#catalogo">Ver catálogo ↓</a>
            <a className="btn btn-green" href={waLink('Hola, quiero cotizar la mejora de mi web')} target="_blank">Cotizar mi web</a>
          </div>
        </div>

        <h2 className="section-title">Antes vs después: lo que cambia una mejora</h2>
        <p className="muted">Esto es lo que le muestro a cada cliente en la propuesta, con números medidos.</p>
        <div className="grid">
          <div className="card">
            <span className="badge badge-warn">❌ Antes: 8,2 seg · Pagespeed 45</span>
            <ul className="check">
              <li>Fotos de 4 MB sin comprimir</li>
              <li>Sin botón de WhatsApp visible</li>
              <li>Formulario que no enviaba nada</li>
              <li>Clientes que se iban a la competencia</li>
            </ul>
          </div>
          <div className="card">
            <span className="badge">✅ Después: 0,7 seg · Pagespeed 98</span>
            <ul className="check">
              <li>Página liviana, optimizada para celular</li>
              <li>Botón de WhatsApp siempre visible</li>
              <li>Cada producto arma su pedido solo</li>
              <li>Dueño recibe el pedido en segundos</li>
            </ul>
            <p><a href={PAGESPEED_URL} target="_blank">🔍 Verificar velocidad en vivo con Google →</a></p>
          </div>
        </div>

        <h2 className="section-title" id="catalogo">Catálogo: así pide tu cliente</h2>
        <p className="muted">Toca “Pedir por WhatsApp” y fíjate: el mensaje ya viene escrito con el producto y el precio. El cliente solo aprieta enviar.</p>
        <div className="grid">
          {PRODUCTS.map((p) => (
            <div className="card" key={p.id}>
              <ProductArt id={p.id} />
              <strong>{p.name}</strong>
              <p className="muted">{p.desc}</p>
              <p className="price">{fmt(p.price)}</p>
              <a
                className="btn btn-green"
                href={waLink(`Hola, quiero pedir: ${p.name} (${fmt(p.price)})`)}
                target="_blank"
              >
                Pedir por WhatsApp
              </a>
            </div>
          ))}
        </div>

        <h2 className="section-title">¿Cómo funciona para el dueño?</h2>
        <div className="steps">
          <div className="step"><span className="step-num">1</span><br /><strong>Cliente elige</strong><p className="muted">Ve el catálogo desde su celular, sin instalar nada.</p></div>
          <div className="step"><span className="step-num">2</span><br /><strong>Mensaje automático</strong><p className="muted">El pedido llega a tu WhatsApp ya redactado: producto + precio.</p></div>
          <div className="step"><span className="step-num">3</span><br /><strong>Confirmas y vendes</strong><p className="muted">Respondes, coordinas entrega y listo. Sin planillas a mano.</p></div>
        </div>

        <h2 className="section-title">Caso ilustrativo: Almacén Los Andes</h2>
        <p className="muted">Ejemplo basado en esta demo — muestra el formato de resultados que entrego medidos con cada trabajo.</p>
        <div className="grid">
          <div className="stat"><b>8,2s → 0,7s</b><span>tiempo de carga</span></div>
          <div className="stat"><b>45 → 98</b><span>Pagespeed móvil</span></div>
          <div className="stat"><b>+30%</b><span>pedidos por WhatsApp*</span></div>
          <div className="stat"><b>0</b><span>pedidos perdidos por form roto</span></div>
        </div>
        <p className="muted">*Proyección típica al eliminar la fricción del pedido. Cada proyecto incluye su propia medición antes/después.</p>

        <div className="card">
          <h3>¿Qué incluye una mejora web como esta?</h3>
          <ul className="check">
            <li>✅ Medición de velocidad antes/después (Pagespeed)</li>
            <li>✅ Botón de WhatsApp flotante + mensajes pre-armados</li>
            <li>✅ Catálogo simple que puedes actualizar</li>
            <li>✅ Formulario que sí llega (WhatsApp + correo)</li>
            <li>✅ 7 días de ajustes incluidos después de la entrega</li>
          </ul>
          <p>
            <a className="btn" href="/automatizacion">Ver demo 2: automatización →</a>{' '}
            <a className="btn btn-outline" href="/stock">Ver demo 3: stock →</a>
          </p>
        </div>

        <Pricing />
        <LeadCTA context="demo de tienda" />

        <div className="card faq">
          <h3>Preguntas típicas</h3>          <details><summary>¿Necesito cambiar mi logo o mis fotos?</summary><p>No. Trabajo con lo que tienes y lo dejo más rápido y ordenado.</p></details>
          <details><summary>¿Cuánto demora?</summary><p>Una mejora como esta: 3 a 5 días + 7 días de garantía.</p></details>
          <details><summary>¿Funciona sin internet rápido?</summary><p>Sí, justamente: al ser liviana carga incluso con mala señal.</p></details>
        </div>

        <div className="card">
          <h3>Horario y contacto (datos de ejemplo)</h3>
          <p>Lun–Sáb 9–20 h · Av. Demo 123 · WhatsApp +56 9 6312 7779</p>
        </div>

        <WhatsAppButton />
      </div>
    </div>
  );
}
