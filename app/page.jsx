import WhatsAppButton from '../components/WhatsAppButton';

const PRODUCTS = [
  { id: 'yerba-1kg', name: 'Yerba 1kg', price: 4500 },
  { id: 'cafe-500g', name: 'Café 500g', price: 6800 },
  { id: 'azucar-1kg', name: 'Azúcar 1kg', price: 1900 },
  { id: 'aceite-900ml', name: 'Aceite 900ml', price: 3200 },
];

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <strong>Almacén Demo — San Martín</strong>
        <nav className="nav">
          <a href="/">Tienda</a>
          <a href="/automatizacion">Automatización</a>
          <a href="/stock">Stock</a>
        </nav>
      </div>

      <span className="badge">⚡ Carga &lt; 1s</span>
      <span className="badge">📱 Mobile-first</span>
      <span className="badge">📩 Pedido por WhatsApp</span>

      <h1>Tu almacén, listo para pedir en 30 segundos</h1>
      <p>Demo portfolio: antes la web tardaba 8s y el formulario no llegaba. Ahora es estática, rápida y cada pedido cae a WhatsApp + planilla.</p>

      <div className="card">
        <strong>Antes vs después (para tu propuesta)</strong>
        <div className="grid">
          <div><span className="badge badge-warn">Antes: 8.2s / 45 Pagespeed</span><p>Foto 4MB, sin caché, form roto.</p></div>
          <div><span className="badge">Después: 0.7s / 98 Pagespeed</span><p>Next.js estático, imágenes optimizadas, WhatsApp directo.</p></div>
        </div>
      </div>

      <h2>Catálogo</h2>
      <div className="grid">
        {PRODUCTS.map((p) => (
          <div className="card" key={p.id}>
            <strong>{p.name}</strong>
            <p>${p.price.toLocaleString('es-AR')}</p>
            <a
              className="btn btn-green"
              href={`https://wa.me/56963127779?text=${encodeURIComponent(`Hola, quiero pedir: ${p.name} ($${p.price})`)}`}
              target="_blank"
            >
              Pedir por WhatsApp
            </a>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Pedido múltiple (demo automatización)</h3>
        <p>Elegí y se arma el mensaje solo. En el trabajo real esto además guarda en Sheets y avisa al dueño.</p>
        <a className="btn" href="/automatizacion">Probar automatización →</a>{' '}
        <a className="btn btn-outline" href="/stock">Ver mini stock →</a>
      </div>

      <div className="card">
        <h3>Horario y contacto</h3>
        <p>Lun-Sáb 9-20h · Av. Demo 123 · Tel/WhatsApp +56 9 6312 7779</p>
      </div>

      <WhatsAppButton />
    </div>
  );
}
