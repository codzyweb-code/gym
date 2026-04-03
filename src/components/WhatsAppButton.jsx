import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919847658992?text=Hi!%20I'm%20interested%20in%20joining%20S4%20Fitness."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
      id="whatsapp-btn"
    >
      <MessageCircle size={26} />
      <span className="whatsapp-btn__tooltip">Chat with us</span>

      <style>{`
        .whatsapp-btn {
          position: fixed;
          bottom: 30px;
          right: 24px;
          width: 56px;
          height: 56px;
          background: #C8102E;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: var(--z-whatsapp);
          box-shadow: 0 4px 20px rgba(200, 16, 46, 0.35);
          transition: all var(--transition-base);
          animation: pulse 2s infinite;
        }
        .whatsapp-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(200, 16, 46, 0.5);
        }
        .whatsapp-btn__tooltip {
          position: absolute;
          right: 70px;
          background: var(--color-bg-card);
          color: var(--color-text-primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: var(--fs-sm);
          font-weight: var(--fw-medium);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translateX(10px);
          transition: all var(--transition-base);
          border: 1px solid var(--color-border);
        }
        .whatsapp-btn:hover .whatsapp-btn__tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </a>
  )
}
