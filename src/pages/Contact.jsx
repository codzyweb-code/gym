import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="container">
          <span className="badge">Get in Touch</span>
          <h1>Contact <span className="text-accent">Us</span></h1>
          <p>Have questions? We'd love to hear from you. Reach out and let's get started!</p>
        </div>
      </div>

      <section className="section" id="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* CONTACT INFO */}
            <ScrollReveal direction="left">
              <div className="contact-info">
                <h3>Let's <span className="text-accent">Connect</span></h3>
                <p className="text-muted" style={{ marginBottom: 'var(--space-2xl)' }}>
                  Visit us, call us, or fill out the form. We'll get back to you within 24 hours.
                </p>

                <div className="contact-items">
                  <div className="contact-item">
                    <div className="contact-item__icon"><MapPin size={22} /></div>
                    <div>
                      <h4>Visit Us</h4>
                      <p>123 Fitness Avenue, Connaught Place,<br />New Delhi - 110001</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item__icon"><Phone size={22} /></div>
                    <div>
                      <h4>Call Us</h4>
                      <p>+91 98765 43210<br />+91 11 4567 8900</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item__icon"><Mail size={22} /></div>
                    <div>
                      <h4>Email Us</h4>
                      <p>info@s4fitness.gym<br />membership@s4fitness.gym</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item__icon"><Clock size={22} /></div>
                    <div>
                      <h4>Operating Hours</h4>
                      <p>Mon - Fri: 5:00 AM - 11:00 PM<br />Sat - Sun: 6:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/919847658992?text=Hi!%20I'd%20like%20to%20know%20more%20about%20S4%20Fitness."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--whatsapp"
                  id="contact-whatsapp-btn"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
              </div>
            </ScrollReveal>

            {/* CONTACT FORM */}
            <ScrollReveal direction="right">
              <div className="contact-form-wrapper">
                {submitted ? (
                  <div className="contact-success">
                    <div className="contact-success__icon">✓</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button className="btn btn--secondary" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                    <h3>Send Us a <span className="text-accent">Message</span></h3>
                    <div className="contact-form__row">
                      <div className="contact-form__field">
                        <label htmlFor="contact-name">Full Name</label>
                        <input type="text" id="contact-name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                      </div>
                      <div className="contact-form__field">
                        <label htmlFor="contact-email">Email</label>
                        <input type="email" id="contact-email" name="email" value={form.email} onChange={handleChange} placeholder="john@email.com" required />
                      </div>
                    </div>
                    <div className="contact-form__row">
                      <div className="contact-form__field">
                        <label htmlFor="contact-phone">Phone</label>
                        <input type="tel" id="contact-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                      </div>
                      <div className="contact-form__field">
                        <label htmlFor="contact-subject">Subject</label>
                        <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange} required>
                          <option value="">Select Subject</option>
                          <option value="membership">Membership Inquiry</option>
                          <option value="trial">Free Trial</option>
                          <option value="training">Personal Training</option>
                          <option value="classes">Group Classes</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-message">Message</label>
                      <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your fitness goals..." rows={5} required />
                    </div>
                    <button type="submit" className="btn btn--primary btn--full btn--large" disabled={loading} id="contact-submit-btn">
                      {loading ? <span className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><Send size={18} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="section section--dark" id="map-section">
        <div className="container">
          <SectionHeader
            badge="Find Us"
            title={<>Visit <span className="text-accent">S4 FITNESS</span></>}
            subtitle="Located in the heart of Connaught Place, New Delhi — easy to reach from anywhere in the city."
          />
          <ScrollReveal>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.735741738653!2d77.21727687527894!3d28.632694675659706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c2d1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1711234567890!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="S4 FITNESS Gym Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-4xl);
        }
        .contact-info h3 {
          font-size: var(--fs-2xl);
          margin-bottom: var(--space-sm);
        }
        .contact-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
        }
        .contact-item {
          display: flex;
          gap: var(--space-lg);
        }
        .contact-item__icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          background: rgba(201, 168, 76, 0.1);
          color: var(--color-accent);
          border: 1px solid rgba(201, 168, 76, 0.2);
          flex-shrink: 0;
        }
        .contact-item h4 {
          font-size: var(--fs-sm);
          margin-bottom: var(--space-xs);
          text-transform: uppercase;
        }
        .contact-item p {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          line-height: 1.6;
        }
        .btn--whatsapp {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: 0.875rem 2rem;
          background: #25D366;
          color: white;
          border-radius: var(--radius-sm);
          font-family: var(--font-heading);
          font-size: var(--fs-md);
          font-weight: var(--fw-semibold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all var(--transition-base);
        }
        .btn--whatsapp:hover {
          background: #1da851;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
        }

        .contact-form-wrapper {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-2xl);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
        .contact-form h3 {
          font-size: var(--fs-xl);
          margin-bottom: var(--space-sm);
        }
        .contact-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }
        .contact-form__field label {
          display: block;
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xs);
          font-weight: var(--fw-medium);
        }
        .contact-success {
          text-align: center;
          padding: var(--space-4xl) var(--space-xl);
        }
        .contact-success__icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--color-success);
          color: white;
          font-size: var(--fs-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-lg);
        }
        .contact-success h3 {
          margin-bottom: var(--space-md);
        }
        .contact-success p {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xl);
        }

        .map-container {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .contact-form__row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
