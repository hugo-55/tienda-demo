// EDITA AQUÍ tus datos reales. Todo el sitio usa estas constantes.
export const PHONE = '56963127779';
export const PHONE_DISPLAY = '+56 9 6312 7779';
export const SITE_URL = 'https://tienda-demo-tau.vercel.app';
export const PAGESPEED_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`;

export const PRICES = {
  mejora: { name: 'Mejora web express', from: 149990, time: '3 a 5 días', desc: 'Velocidad + WhatsApp + formulario que sí llega.' },
  auto: { name: 'Automatización', from: 199990, time: '5 a 7 días', desc: 'Pedido → planilla → aviso automático.' },
  stock: { name: 'Mini stock', from: 249990, time: '7 a 10 días', desc: 'Semáforo, alertas y reporte semanal.' },
  pack: { name: 'Pack negocio completo', from: 449990, time: '~2 semanas', desc: 'Las 3 cosas + 14 días de soporte.' },
};

export const fmtCLP = (n) => `$${Number(n).toLocaleString('es-CL')}`;
export const waLink = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// Conector planilla real: pega aquí la URL de tu Apps Script (ver SHEETS-SETUP.md).
// Vacío = modo demo (log simulado). Con URL = pedidos reales a tu Google Sheet.
export const SHEET_ENDPOINT = '';

// Aviso WhatsApp automático al dueño (ver NOTIFY-SETUP.md).
// Vacío = aviso simulado en el log. Con URL = mensaje real a tu celular.
export const NOTIFY_ENDPOINT = '';
export const NOTIFY_TO = PHONE;
