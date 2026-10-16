// Ilustraciones livianas por producto (sin fotos externas = carga instantánea).
// Cuando tengas fotos reales, reemplaza el emoji por <img src="..."> aquí.
const ART = {
  'yerba-1kg': { emoji: '🧉', bg: 'linear-gradient(135deg, #65a30d, #365314)' },
  'cafe-500g': { emoji: '☕', bg: 'linear-gradient(135deg, #92400e, #451a03)' },
  'azucar-1kg': { emoji: '🍚', bg: 'linear-gradient(135deg, #0ea5e9, #0c4a6e)' },
  'aceite-900ml': { emoji: '🫗', bg: 'linear-gradient(135deg, #eab308, #713f12)' },
};

export default function ProductArt({ id }) {
  const a = ART[id] || { emoji: '📦', bg: 'linear-gradient(135deg, #64748b, #1e293b)' };
  return (
    <div
      style={{
        background: a.bg,
        borderRadius: 10,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 56,
        marginBottom: 10,
      }}
      aria-hidden
    >
      {a.emoji}
    </div>
  );
}

export function Logo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #052e16, #16a34a)',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
          fontWeight: 800,
        }}
      >
        A
      </span>
      <span className="logo">Almacén Demo</span>
    </span>
  );
}
