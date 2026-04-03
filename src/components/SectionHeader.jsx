export default function SectionHeader({ badge, title, subtitle, center = true, light = false }) {
  return (
    <div className={`section-header ${center ? 'section-header--center' : ''}`}>
      {badge && <span className="badge">{badge}</span>}
      <h2 className="section-header__title">
        {title}
      </h2>
      <div className="divider" style={center ? { margin: 'var(--space-md) auto' } : {}} />
      {subtitle && (
        <p className={`section-header__subtitle ${light ? '' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
      <style>{`
        .section-header {
          margin-bottom: var(--space-3xl);
        }
        .section-header--center {
          text-align: center;
        }
        .section-header .badge {
          margin-bottom: var(--space-md);
        }
        .section-header__title {
          margin-top: var(--space-sm);
        }
        .section-header__subtitle {
          font-size: var(--fs-md);
          color: var(--color-text-secondary);
          max-width: 600px;
          line-height: 1.7;
        }
        .section-header--center .section-header__subtitle {
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}
