# Tienda Demo — portfolio freelance (Next.js)

Demo triple en un deploy: mejora web + automatización + mini stock para pymes.

## Rutas
- `/` tienda rápida con pedido por WhatsApp + comparativa antes/después
- `/automatizacion` form → log Sheets/WhatsApp simulado (en prod: Sheets/Make/n8n)
- `/stock` CRUD + alerta mínimo + export CSV (guarda en localStorage)

## Correr local
npm install
npm run dev

## Deploy Vercel (2 min)
1. Subir a GitHub
2. vercel.com → New Project → import repo → Deploy (sin env vars)
3. Pegar URL real abajo + grabar Loom 60-90s por ruta

## Loom guion 60s
1. "Web vieja 8s, form roto" (10s)
2. Mostrar esta demo: velocidad, WhatsApp, pedido (30s)
3. "Para tu negocio haría X, entrega en N días + garantía" (20s)

## URLs y repo
- Repo: https://github.com/hugo-55/tienda-demo
- Prod: https://tienda-demo-tau.vercel.app/
- Videos: PENDIENTE (pegar 3 Looms)
