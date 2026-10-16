export default function WhatsAppButton({ phone = '56963127779', text = 'Hola, quiero hacer un pedido' }) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  return (
    <a className="wa-float" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      ✆
    </a>
  );
}
