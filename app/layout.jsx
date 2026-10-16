import './globals.css';

export const metadata = {
  title: 'Tienda Demo — Web rápida + Pedidos por WhatsApp',
  description: 'Demo portfolio: mejora web, automatización y mini stock para pymes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
