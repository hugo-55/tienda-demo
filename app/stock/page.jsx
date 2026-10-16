'use client';
import { useEffect, useState } from 'react';
import WhatsAppButton from '../../components/WhatsAppButton';

const KEY = 'demo-stock-v1';
const SEED = [
  { id: 'yerba', name: 'Yerba 1kg', stock: 12, min: 5, price: 4500 },
  { id: 'cafe', name: 'Café 500g', stock: 3, min: 4, price: 6800 },
  { id: 'azucar', name: 'Azúcar 1kg', stock: 20, min: 6, price: 1900 },
];

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

  const lows = items.filter((i) => i.stock <= i.min);

  function add(e) {
    e.preventDefault();
    if (!name) return alert('Nombre requerido');
    setItems((s) => [...s, { id: `p${Date.now()}`, name, stock: Number(stock), min: Number(min), price: 0 }]);
    setName('');
  }
  function move(id, d) {
    setItems((s) => s.map((i) => (i.id === id ? { ...i, stock: Math.max(0, i.stock + d) } : i)));
  }
  function toCSV() {
    const rows = [['producto', 'stock', 'minimo', 'alerta'], ...items.map((i) => [i.name, i.stock, i.min, i.stock <= i.min ? 'REPONER' : 'OK'])];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stock.csv';
    a.click();
  }

  return (
    <div className="container">
      <div className="header">
        <strong>Mini Stock</strong>
        <nav className="nav"><a href="/">Tienda</a><a href="/automatizacion">Automatización</a><a href="/stock">Stock</a></nav>
      </div>
      <h1>Control de stock simple</h1>
      {lows.length > 0 && <div className="alert-low">⚠️ Reponer: {lows.map((i) => `${i.name} (${i.stock}/${i.min})`).join(', ')}</div>}
      <div className="card">
        <table>
          <thead><tr><th>Producto</th><th>Stock</th><th>Mín</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td><td>{i.stock}</td><td>{i.min}</td>
                <td>{i.stock <= i.min ? '🔴 Reponer' : '🟢 OK'}</td>
                <td><button onClick={() => move(i.id, -1)}>-1</button> <button onClick={() => move(i.id, 1)}>+1</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><button className="btn btn-outline" onClick={toCSV}>Exportar CSV</button></p>
      </div>
      <div className="card">
        <h3>Agregar producto</h3>
        <form onSubmit={add}>
          <label>Nombre</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Fideos 500g" />
          <label>Stock inicial</label><input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          <label>Stock mínimo (alerta)</label><input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} />
          <button className="btn" type="submit">Agregar</button>
        </form>
      </div>
      <WhatsAppButton />
    </div>
  );
}
