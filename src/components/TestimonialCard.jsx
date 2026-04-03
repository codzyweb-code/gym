import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ name, role, text, rating = 5, image }) {
  return (
    <div className="testimonial-card card">
      <Quote size={32} className="testimonial-card__quote" />
      <p className="testimonial-card__text">{text}</p>
      <div className="testimonial-card__stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? '#C9A84C' : 'transparent'}
            color={i < rating ? '#C9A84C' : '#444'}
          />
        ))}
      </div>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar" style={{
          background: `linear-gradient(135deg, var(--color-accent), var(--color-secondary))`,
        }}>
          {image ? <img src={image} alt={name} /> : name?.charAt(0)}
        </div>
        <div>
          <h4 className="testimonial-card__name">{name}</h4>
          <p className="testimonial-card__role">{role}</p>
        </div>
      </div>

      <style>{`
        .testimonial-card {
          padding: var(--space-2xl);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
        .testimonial-card__quote {
          color: var(--color-accent);
          opacity: 0.3;
        }
        .testimonial-card__text {
          font-size: var(--fs-md);
          color: var(--color-text-secondary);
          line-height: 1.8;
          flex: 1;
        }
        .testimonial-card__stars {
          display: flex;
          gap: 2px;
        }
        .testimonial-card__author {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding-top: var(--space-md);
          border-top: 1px solid var(--color-border);
        }
        .testimonial-card__avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: var(--fs-lg);
          font-weight: var(--fw-bold);
          color: white;
          overflow: hidden;
          flex-shrink: 0;
        }
        .testimonial-card__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .testimonial-card__name {
          font-family: var(--font-heading);
          font-size: var(--fs-base);
          text-transform: uppercase;
        }
        .testimonial-card__role {
          font-size: var(--fs-xs);
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  )
}
