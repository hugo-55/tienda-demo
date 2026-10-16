'use client';
import { useEffect, useMemo, useState } from 'react';
import WhatsAppButton from '../../components/WhatsAppButton';
import LeadCTA from '../../components/LeadCTA';
import Pricing from '../../components/Pricing';
import { loadItems, addItem, setStock, removeItem, isCloud } from '../../lib/stockStore';

const SEED = [
  { id: 'seed-yerba', name: 'Yerba mate 1 kg', stock: 12, min: 5, price: 4990 },
  { id: 'seed-cafe', name: 'Café molido 500 g', stock: 3, min: 4, price: 7990 },
  { id: 'seed-azucar', name: 'Azúcar 1 kg', stock: 20, min: 6, price: 1990 },
];

const fmt = (n) => `$${Number(n || 0).toLocaleString('es-CL')}`;

export default function Stock() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [stock, setStockInit] = useState(10);
  const [min, setMin] = useState(5);

  async function refresh() {
    setError('');
    try {
      setItems(await loadItems(SEED));
    } catch (e) {
      setError(`No se pudo cargar: ${e.message}`);
    }
  }
  useEffect(() => { refresh(); }, []);

  const lows = useMemo(() => (items || []).filter((i) => i.stock <= i.min), [items]);
  const totalUnits = useMemo(() => (items || []).reduce((a, i) => a + i.stock, 0), [items]);
  const totalValue = useMemo(() => (items || []).reduce((a, i) => a + i.stock * (i.price || 0), 0), [items]);

  async function run(fn) {
    setError('');
    try { setItems(await fn(items)); }
    catch (e) { setError(`Error: ${e.message}`); }
  }
  function add(e) {
    e.preventDefault();
    if (!name.trim()) return alert('Escribe el nombre del producto');
    run((cur) => addItem(cur, { name: name.trim(), stock: Number(stock), min: Number(min) }));
    setName('');
  }

  return (
    <div>
      <div className="topbar">
        <div className="topbar-inner">
          <span className="logo">📦 Mini Stock</span>
          <nav className="nav"><a href="/">Tienda</a><a href="/automatizacion">Automatización</a><a href="/stock">Stock</a></nav>
        </div>
      </div>
      <div className="container">
        <h1>Tu stock de un vistazo: qué reponer hoy</h1>
        <p>
          {isCloud
            ? '☁️ Conectado a la nube: lo que cambies aquí se ve en tu celular y tu PC.'
            : '📱 Modo este navegador. Conecta la nube (guía abajo) y se comparte entre tus dispositivos.'}{' '}
          <button className="btn btn-outline" onClick={refresh} style={{ padding: '6px 12px' }}>↻ Actualizar</button>
        </p>

        {error && <div className="alert-low">{error}</div>}

        {!items ? <div className="card">Cargando inventario...</div> : (
          <>
            <div className="grid">
              <div className="stat"><b>{items.length}</b><span>productos</span></div>
              <div className="stat"><b>{totalUnits}</b><span>unidades totales</span></div>
              <div className="stat"><b>{lows.length}</b><span>para reponer 🔴</span></div>
              <div className="stat"><b>{fmt(totalValue)}</b><span>valorizado</span></div>
            </div>

            {lows.length > 0
              ? <div className="alert-low">⚠️ Hoy hay que reponer: {lows.map((i) => `${i.name} (quedan ${i.stock}, mínimo ${i.min})`).join(' · ')}</div>
              : <div className="card">✅ Todo con stock suficiente. Nada que reponer hoy.</div>}

            <div className="card">
              <h3>Inventario (prueba: aprieta −1 en Café y mira la alerta)</h3>
              <table>
                <thead><tr><th>Producto</th><th>Stock</th><th>Mínimo</th><th>Estado</th><th>Mover</th><th></th></tr></thead>
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id}>
                      <td><strong>{i.name}</strong><br /><span className="muted">{fmt(i.price)} c/u</span></td>
                      <td>{i.stock}</td>
                      <td>{i.min}</td>
                      <td>{i.stock <= i.min ? <span className="low-pill">🔴 Reponer</span> : <span className="ok-pill">🟢 OK</span>}</td>
                      <td><button onClick={() => run((c) => setStock(c, i.id, i.stock - 1))}>−1</button> <button onClick={() => run((c) => setStock(c, i.id, i.stock + 1))}>+1</button></td>
                      <td><button onClick={() => { if (confirm('¿Eliminar este producto?')) run((c) => removeItem(c, i.id)); }}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p><button className="btn btn-outline" onClick={() => {
                const rows = [['producto', 'stock', 'minimo', 'estado'], ...items.map((i) => [i.name, i.stock, i.min, i.stock <= i.min ? 'REPONER' : 'OK'])];
                const blob = new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'stock.csv';
                a.click();
              }}>⬇ Exportar reporte CSV</button> <span className="muted">Lo abres en Excel/Sheets.</span></p>
            </div>
          </>
        )}

        <div className="card">
          <h3>Agregar un producto</h3>
          <form onSubmit={add}>
            <label>Nombre del producto</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Fideos 500 g" />
            <label>¿Cuántos tienes hoy?</label><input type="number" min="0" value={stock} onChange={(e) => setStockInit(Number(e.target.value))} />
            <label>¿Con cuántos quieres que te avise?</label><input type="number" min="0" value={min} onChange={(e) => setMin(Number(e.target.value))} />
            <button className="btn" type="submit">Agregar al inventario</button>
          </form>
        </div>

        <div className="card">
          <h3>Activar nube (10 min, gratis, una vez)</h3>
          <p className="muted">Sigue la guía <strong>SUPABASE-SETUP.md</strong> del repo: creas el proyecto, pegas 2 claves en Vercel y listo. Sin cambiar código, arriba cambia a ☁️ y los datos se comparten entre dispositivos con respaldo.</p>
        </div>

        <Pricing />
        <LeadCTA context="demo de stock" />
        <WhatsAppButton />
      </div>
    </div>
  );
}
