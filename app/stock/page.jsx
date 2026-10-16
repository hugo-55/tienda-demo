'use client';
import { useEffect, useMemo, useState } from 'react';
import WhatsAppButton from '../../components/WhatsAppButton';

const KEY = 'demo-stock-v1';
const SEED = [
  { id: 'yerba', name: 'Yerba mate 1 kg', stock: 12, min: 5, price: 4990 },
  { id: 'cafe', name: 'Café molido 500 g', stock: 3, min: 4, price: 7990 },
  { id: 'azucar', name: 'Azúcar 1 kg', stock: 20, min: 6, price: 1990 },
];

const fmt = (n) => `$${Number(n || 0).toLocaleString('es-CL')}`;

export default function Stock() {
  const [items, setItems] = useState(SEED);
  const [name, setName] = useState('');
  const [stock, setStock] = useState(10);
  const [min, setMin] = useState(5);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const lows = useMemo(() => items.filter((i) => i.stock <= i.min), [items]);
  const totalUnits = useMemo(() => items.reduce((a, i) => a + i.stock, 0), [items]);
  const totalValue = useMemo(() => items.reduce((a, i) => a + i.stock * (i.price || 0), 0), [items]);

  function add(e) {
    e.preventDefault();
    if (!name.trim()) return alert('Escribe el nombre del producto');
    setItems((s) => [...s, { id: `p${Date.now()}`, name: name.trim(), stock: Number(stock), min: Number(min), price: 0 }]);
    setName('');
  }
  function move(id, d) {
    setItems((s) => s.map((i) => (i.id === id ? { ...i, stock: Math.max(0, i.stock + d) } : i)));
  }
  function remove(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    setItems((s) => s.filter((i) => i.id !== id));
  }
  function toCSV() {
    const rows = [['producto', 'stock', 'minimo', 'estado'], ...items.map((i) => [i.name, i.stock, i.min, i.stock <= i.min ? 'REPONER' : 'OK'])];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stock.csv';
    a.click();
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
          <strong>El problema:</strong> el cuaderno o Excel no avisa y te quedas sin
          productos top. <strong>La solución:</strong> una pantalla simple con semáforo
          🟢/🔴, alertas de mínimo y reporte semanal en 1 clic.
        </p>

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
                  <td><button onClick={() => move(i.id, -1)}>−1</button> <button onClick={() => move(i.id, 1)}>+1</button></td>
                  <td><button onClick={() => remove(i.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><button className="btn btn-outline" onClick={toCSV}>⬇ Exportar reporte CSV</button> <span className="muted">Lo abres en Excel/Sheets.</span></p>
        </div>

        <div className="card">
          <h3>Agregar un producto (así lo harías tú cada semana)</h3>
          <form onSubmit={add}>
            <label>Nombre del producto</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Fideos 500 g" />
            <label>¿Cuántos tienes hoy?</label><input type="number" min="0" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
            <label>¿Con cuántos quieres que te avise?</label><input type="number" min="0" value={min} onChange={(e) => setMin(Number(e.target.value))} />
            <button className="btn" type="submit">Agregar al inventario</button>
          </form>
          <p className="muted">Todo se guarda en este navegador (demo). En el trabajo real queda en la nube con usuarios y respaldo.</p>
        </div>

        <WhatsAppButton />
      </div>
    </div>
  );
}
