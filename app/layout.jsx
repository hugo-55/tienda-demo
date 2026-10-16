import './globals.css';
import { SITE_URL } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Almacén Demo — Web rápida + Pedidos por WhatsApp',
    template: '%s | Almacén Demo',
  },
  description:
    'Mejoro webs lentas y automatizo pedidos y stock para almacenes y pymes. Demo en vivo: catálogo con pedido por WhatsApp, automatización y mini stock.',
  keywords: ['almacén', 'tienda', 'pedidos whatsapp', 'control stock', 'mejora web', 'automatización pymes Chile'],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Almacén Demo',
    title: 'Tu almacén vende por WhatsApp en 30 segundos',
    description: 'Web rápida + pedidos automáticos + stock simple. Mira la demo en vivo.',
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tu almacén vende por WhatsApp en 30 segundos',
    description: 'Web rápida + pedidos automáticos + stock simple. Mira la demo en vivo.',
    images: [`${SITE_URL}/og`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
