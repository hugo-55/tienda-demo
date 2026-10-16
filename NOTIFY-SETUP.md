# Aviso WhatsApp automático (10 min + costo bajo o gratis)

Cuando entra un pedido, además de guardar en Sheets la demo puede mandarte un WhatsApp real. Sin configurar, el aviso se simula en el log.

La demo llama a `NOTIFY_ENDPOINT` con `{ to, message }`. Usa el proveedor que prefieras:

## Opción A — CallMeBot (gratis para empezar)
1. Guarda `+34 644 10 55 84` en tu celular y mándale por WhatsApp: `I allow callmebot to send me messages`
2. Recibes tu `apikey`
3. Crea un Apps Script o usa esta URL directa como endpoint... **ojo:** CallMeBot usa GET con query params, no acepta POST JSON genérico. Para usarlo crea este puente en Apps Script (Extensiones → Apps Script de cualquier hoja):

```gs
var APIKEY = 'TU-APIKEY-CALLMEBOT';
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var url = 'https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(d.to)
    + '&text=' + encodeURIComponent(d.message) + '&apikey=' + APIKEY;
  UrlFetchApp.fetch(url);
  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}
```

Despliega como aplicación web (igual que SHEETS-SETUP.md) y pega esa URL en `lib/site.js → NOTIFY_ENDPOINT`.

## Opción B — UltraMsg / Twilio (recomendado para clientes)
- UltraMsg: instancia WhatsApp (~USD 5-15/mes), endpoint de envío con token. Más estable y con tu número.
- Twilio: WhatsApp Business API oficial, paga por mensaje.
- En ambos casos crea el mismo puente: recibe `{ to, message }` y reenvía a su API.

## Verificar
1. Pega la URL en `NOTIFY_ENDPOINT`, commit + push
2. Haz un pedido en `/automatizacion` → debe llegarte el WhatsApp en segundos y el cartel 🟢 EN VIVO
