import { ExternalLink, Award } from 'lucide-react'

export default function TrainerCard({ name, role, specialization, experience, image, instagram }) {
  return (
    <div className="trainer-card card">
      <div className="trainer-card__image">
        <div className="trainer-card__img-placeholder" style={{
          background: image ? `url(${image}) center/cover` : `linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-card))`,
        }}>
          {!image && (
            <span className="trainer-card__initials">{name?.split(' ').map(n => n[0]).join('')}</span>
          )}
        </div>
        <div className="trainer-card__overlay">
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="trainer-card__social">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      <div className="trainer-card__info">
        <h3 className="trainer-card__name">{name}</h3>
        <p className="trainer-card__role text-accent">{role}</p>
        <p className="trainer-card__spec">{specialization}</p>
        {experience && (
          <div className="trainer-card__exp">
            <Award size={14} />
            <span>{experience} Years Experience</span>
          </div>
        )}
      </div>

      <style>{`
        .trainer-card {
          overflow: hidden;
          text-align: center;
        }
        .trainer-card__image {
          position: relative;
          height: 320px;
          overflow: hidden;
        }
        .trainer-card__img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-slow);
        }
        .trainer-card:hover .trainer-card__img-placeholder {
          transform: scale(1.05);
        }
        .trainer-card__initials {
          font-family: var(--font-heading);
          font-size: var(--fs-4xl);
          font-weight: var(--fw-bold);
          color: var(--color-text-muted);
          opacity: 0.5;
        }
        .trainer-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: var(--space-lg);
          opacity: 0;
          transition: opacity var(--transition-base);
        }
        .trainer-card:hover .trainer-card__overlay {
          opacity: 1;
        }
        .trainer-card__social {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: transform var(--transition-base);
        }
        .trainer-card__social:hover {
          transform: scale(1.1);
        }
        .trainer-card__info {
          padding: var(--space-lg);
        }
        .trainer-card__name {
          font-size: var(--fs-lg);
          margin-bottom: var(--space-xs);
        }
        .trainer-card__role {
          font-size: var(--fs-sm);
          font-weight: var(--fw-semibold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-sm);
        }
        .trainer-card__spec {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-sm);
        }
        .trainer-card__exp {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: var(--fs-xs);
          color: var(--color-text-muted);
          background: var(--color-bg-tertiary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }
      `}</style>
    </div>
  )
}
