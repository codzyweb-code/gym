import { Check, ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PricingCard({ name, price, period, features, popular = false, description }) {
  return (
    <div className={`pricing-card card ${popular ? 'pricing-card--popular' : ''}`}>
      {popular && (
        <div className="pricing-card__badge">
          <Zap size={14} />
          Most Popular
        </div>
      )}
      <div className="pricing-card__header">
        <h3 className="pricing-card__name">{name}</h3>
        {description && <p className="pricing-card__desc">{description}</p>}
        <div className="pricing-card__price">
          <span className="pricing-card__currency">₹</span>
          <span className="pricing-card__amount">{price}</span>
          <span className="pricing-card__period">/{period}</span>
        </div>
      </div>
      <div className="pricing-card__features">
        {features.map((feature, i) => (
          <div key={i} className="pricing-card__feature">
            <Check size={16} className="pricing-card__check" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <a
        href={`https://wa.me/919847658992?text=${encodeURIComponent(`Hi! I'd like to purchase the *${name}* plan (₹${price}/${period}) at S4 Fitness. Please help me get started.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${popular ? 'btn--primary' : 'btn--secondary'} btn--full`}
        id={`pricing-${name.toLowerCase().replace(/\s/g, '-')}-btn`}
      >
        Get Started <ArrowRight size={18} />
      </a>

      <style>{`
        .pricing-card {
          padding: var(--space-2xl);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pricing-card--popular {
          border-color: var(--color-accent);
          background: linear-gradient(180deg, rgba(201,168,76,0.05) 0%, var(--color-bg-card) 40%);
          box-shadow: 0 0 40px rgba(201,168,76,0.1);
          transform: scale(1.03);
        }
        .pricing-card--popular:hover {
          transform: scale(1.05);
        }
        .pricing-card__badge {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--color-accent), var(--color-secondary));
          color: white;
          padding: 0.375rem 1.25rem;
          border-radius: 0 0 var(--radius-md) var(--radius-md);
          font-size: var(--fs-xs);
          font-weight: var(--fw-bold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        .pricing-card__header {
          text-align: center;
          padding-bottom: var(--space-xl);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: var(--space-xl);
        }
        .pricing-card__name {
          font-size: var(--fs-xl);
          margin-bottom: var(--space-sm);
        }
        .pricing-card__desc {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-lg);
        }
        .pricing-card__price {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 2px;
        }
        .pricing-card__currency {
          font-size: var(--fs-xl);
          font-weight: var(--fw-bold);
          color: var(--color-accent);
          margin-top: 0.5rem;
        }
        .pricing-card__amount {
          font-family: var(--font-heading);
          font-size: var(--fs-5xl);
          font-weight: var(--fw-bold);
          line-height: 1;
        }
        .pricing-card__period {
          font-size: var(--fs-sm);
          color: var(--color-text-muted);
          align-self: flex-end;
          margin-bottom: 0.3rem;
        }
        .pricing-card__features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin-bottom: var(--space-2xl);
        }
        .pricing-card__feature {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
        }
        .pricing-card__check {
          color: var(--color-accent);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  )
}
