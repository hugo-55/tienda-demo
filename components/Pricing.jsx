import { PRICES, fmtCLP, waLink } from '../lib/site';

// Precios visibles en las 3 demos. EDITA montos en lib/site.js
export default function Pricing() {
  const items = [PRICES.mejora, PRICES.auto, PRICES.stock];
  return (
    <div>
      <h2 className="section-title">Precios claros, sin letra chica</h2>
      <div className="grid">
        {items.map((p) => (
          <div className="card" key={p.name}>
            <strong>{p.name}</strong>
            <p className="price">desde {fmtCLP(p.from)}</p>
            <p className="muted">{p.desc} Entrega: {p.time}.</p>
            <a className="btn btn-outline" href={waLink(`Hola, me interesa: ${p.name} (desde ${fmtCLP(p.from)}). ¿Me cotizas mi caso?`)} target="_blank">
              Cotizar este
            </a>
          </div>
        ))}
      </div>
      <div className="card" style={{ background: '#052e16', color: '#fff' }}>
        <strong>⭐ {PRICES.pack.name}: desde {fmtCLP(PRICES.pack.from)}</strong>
        <p style={{ opacity: 0.9 }}>{PRICES.pack.desc} Entrega: {PRICES.pack.time}. Ahorras vs contratar por separado.</p>
        <a className="btn btn-white" href={waLink(`Hola, me interesa el ${PRICES.pack.name} (${fmtCLP(PRICES.pack.from)}). ¿Hablamos 15 min?`)} target="_blank">
          Quiero el pack
        </a>
      </div>
    </div>
  );
}
