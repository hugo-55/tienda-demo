# Guardado real en Google Sheets (5 min, una sola vez)

La demo funciona hoy en modo demo. Para que los pedidos caigan de verdad en tu planilla:

## 1. Crea la planilla
1. sheets.google.com → hoja nueva → llámala `Pedidos`
2. Primera fila: `fecha | nombre | producto | cantidad`

## 2. Pega el receptor
1. En la planilla: Extensiones → Apps Script
2. Borra todo y pega esto:

```gs
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Pedidos') || ss.insertSheet('Pedidos');
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.fecha || new Date(), d.nombre || '', d.producto || '', d.cantidad || 1]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Desplegar → Nueva implementación → tipo **Aplicación web** → Ejecutar como: **yo** → Acceso: **cualquier persona** → Desplegar
4. Copia la URL que termina en `/exec`

## 3. Conéctala a la demo
1. Abre `lib/site.js` → pega la URL en `SHEET_ENDPOINT`
2. Commit + push (Vercel redespliega solo)
3. Prueba en `/automatizacion`: el cartel cambia a 🟢 EN VIVO y la fila aparece en tu Sheet

## Notas
- Gratis hasta miles de pedidos/mes. Sin Make ni Zapier.
- El aviso WhatsApp al dueño se activa en el paso siguiente (plantilla + API de mensajes).
- Si la URL falla, la demo cae sola a modo demo con aviso, nunca se rompe.
