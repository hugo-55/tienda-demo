// Stock con nube (Supabase) + respaldo local.
// Sin configurar = funciona 100% en este navegador (como antes).
// Con env vars = compartido entre PC y celular. Ver SUPABASE-SETUP.md
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const isCloud = Boolean(URL && KEY);

let sb = null;
if (isCloud) sb = createClient(URL, KEY);

const LS_KEY = 'demo-stock-v1';

const toApp = (r) => ({ id: String(r.id), name: r.name, stock: r.stock, min: r.min, price: r.price || 0 });

export async function loadItems(seed) {
  if (!isCloud) {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return seed;
  }
  const { data, error } = await sb.from('products').select('*').order('name');
  if (error) throw new Error(error.message);
  return (data || []).map(toApp);
}

function saveLocal(items) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch {}
}

export async function addItem(items, { name, stock, min }) {
  if (!isCloud) {
    const next = [...items, { id: `p${Date.now()}`, name, stock, min, price: 0 }];
    saveLocal(next);
    return next;
  }
  const { data, error } = await sb.from('products').insert({ name, stock, min, price: 0 }).select().single();
  if (error) throw new Error(error.message);
  return [...items, toApp(data)];
}

export async function setStock(items, id, stock) {
  const next = items.map((i) => (i.id === id ? { ...i, stock: Math.max(0, stock) } : i));
  if (!isCloud) { saveLocal(next); return next; }
  const { error } = await sb.from('products').update({ stock: Math.max(0, stock) }).eq('id', id);
  if (error) throw new Error(error.message);
  return next;
}

export async function removeItem(items, id) {
  if (!isCloud) {
    const next = items.filter((i) => i.id !== id);
    saveLocal(next);
    return next;
  }
  const { error } = await sb.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return items.filter((i) => i.id !== id);
}
