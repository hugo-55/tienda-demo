# Stock en nube con Supabase (10 min, gratis, una vez)

Sin esto la demo guarda en cada navegador por separado. Con esto, PC y celular comparten el mismo inventario con respaldo.

## 1. Crea el proyecto
1. supabase.com → New project (gratis) → anota la contraseña DB
2. SQL Editor → New query → pega y ejecuta:

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  stock int not null default 0,
  min int not null default 0,
  price int not null default 0,
  created_at timestamptz default now()
);
alter table products enable row level security;
create policy "acceso demo" on products for all using (true) with check (true);
insert into products (name, stock, min, price) values
  ('Yerba mate 1 kg', 12, 5, 4990),
  ('Café molido 500 g', 3, 4, 7990),
  ('Azúcar 1 kg', 20, 6, 1990);
```

> Nota: la policy abierta es solo para esta demo. Para un cliente real se usa login con usuarios.

## 2. Conecta la demo
1. En Supabase: Project Settings → API → copia `Project URL` y `anon public`
2. Local: crea `.env.local` en `tienda-demo/` con:
```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
```
3. Vercel: Project → Settings → Environment Variables → agrega las mismas 2 → Redeploy

## 3. Verifica
Abre `/stock` en PC y celular: resta 1 en uno, aprieta ↻ Actualizar en el otro. Arriba debe decir ☁️.

## Vuelta atrás
Borra las 2 variables y redespliega: vuelve a modo navegador sin perder código.
