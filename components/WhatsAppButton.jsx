import { PHONE } from '../lib/site';

export default function WhatsAppButton({ text = 'Hola, quiero hacer un pedido' }) {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  return (
    <a className="wa-float" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      ✆
    </a>
  );
}
