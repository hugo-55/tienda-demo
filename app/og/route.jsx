import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #052e16, #15803d)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.9 }}>🏪 Almacén Demo</div>
        <div style={{ fontSize: 72, fontWeight: 800, marginTop: 16, lineHeight: 1.1 }}>
          Tu almacén vende por WhatsApp en 30 segundos
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9 }}>
          Web rápida + pedidos automáticos + stock simple
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
