"use client";

import { useState } from 'react'
import Link from 'next/link';

import { ChevronDown, ChevronUp } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import ScrollReveal from '../../components/ScrollReveal'
import PricingCard from '../../components/PricingCard'

const plans = [
  {
    name: 'Starter',
    price: '1,499',
    period: 'month',
    description: 'Perfect for beginners looking to start their fitness journey.',
    features: [
      'Full gym floor access',
      'Locker & shower facilities',
      'Free fitness assessment',
      'Access to cardio zone',
      'Mobile app access',
    ],
  },
  {
    name: 'Pro',
    price: '2,999',
    period: 'month',
    popular: true,
    description: 'Our most popular plan — ideal for serious fitness enthusiasts.',
    features: [
      'Everything in Starter',
      'Unlimited group classes',
      'Monthly body composition analysis',
      'Personalized workout plan',
      'Nutrition consultation',
      'Sauna & steam access',
      'Guest pass (1/month)',
    ],
  },
  {
    name: 'Elite',
    price: '4,999',
    period: 'month',
    description: 'The ultimate experience for those who demand the best.',
    features: [
      'Everything in Pro',
      '8 personal training sessions/month',
      'Priority class booking',
      'Dedicated locker',
      'Custom meal plans',
      'Quarterly photoshoots',
      'VIP lounge access',
      'Unlimited guest passes',
    ],
  },
]

const faqs = [
  { q: 'Is there a joining fee?', a: 'No! We have zero joining fees. Just pick your plan and start training right away. We believe fitness should be accessible to everyone.' },
  { q: 'Can I freeze my membership?', a: 'Yes, you can freeze your membership for up to 30 days per year at no additional charge. Just inform us at least 3 days in advance.' },
  { q: 'What are the gym timings?', a: 'We\'re open Monday to Friday from 5:00 AM to 11:00 PM, and Saturday-Sunday from 6:00 AM to 10:00 PM. That\'s 18 hours of daily access!' },
  { q: 'Do you offer a free trial?', a: 'Absolutely! We offer a complimentary 3-day trial for all new visitors. Just walk in with a valid ID and experience everything S4 FITNESS has to offer.' },
  { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time. The price difference will be prorated for the remaining days in your billing cycle.' },
  { q: 'Is personal training included in the membership?', a: 'Starter and Pro plans include a free initial fitness assessment. Full 1-on-1 personal training packages are purchased separately. Elite members receive one free session monthly.' },
  { q: 'Do you have parking?', a: 'Yes, we have free parking for all members. Our facility in Sulthan Bathery has both two-wheeler and four-wheeler parking spaces.' },
  { q: 'Can I freeze my membership if I travel?', a: 'Yes! Pro members can freeze their membership for up to 14 days per year, and Elite members get up to 30 days of freeze time.' },
]

export default function Membership() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="container">
          <span className="badge">Membership Plans</span>
          <h1>Simple, Transparent <span className="text-accent">Pricing</span></h1>
          <p>No hidden fees. No long-term contracts. Just straightforward plans designed for your goals.</p>
        </div>
      </div>

      {/* PRICING CARDS */}
      <section className="section" id="pricing-plans">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <PricingCard {...plan} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="pricing-note">
              <p>💡 <strong>Save more with longer commitments:</strong> Get 10% off on quarterly plans and 20% off on annual plans.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section section--dark" id="plan-comparison">
        <div className="container">
          <SectionHeader
            badge="Compare Plans"
            title={<>Feature <span className="text-accent">Comparison</span></>}
            subtitle="See exactly what's included in each plan at a glance."
          />
          <ScrollReveal>
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Starter</th>
                    <th className="comparison-table__popular">Pro ⭐</th>
                    <th>Elite</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Gym Floor Access', '✓', '✓', '✓'],
                    ['Cardio Zone', '✓', '✓', '✓'],
                    ['Locker & Showers', '✓', '✓', '✓'],
                    ['Group Classes', '—', 'Unlimited', 'Unlimited'],
                    ['Personal Training', '—', '—', '8/month'],
                    ['Nutrition Plan', '—', '✓', 'Custom'],
                    ['Body Composition', '—', 'Monthly', 'Monthly'],
                    ['Sauna & Steam', '—', '✓', '✓'],
                    ['Guest Passes', '—', '1/month', 'Unlimited'],
                    ['VIP Lounge', '—', '—', '✓'],
                    ['Priority Booking', '—', '—', '✓'],
                  ].map(([feature, s, p, e], i) => (
                    <tr key={i}>
                      <td>{feature}</td>
                      <td>{s}</td>
                      <td className="comparison-table__popular">{p}</td>
                      <td>{e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <SectionHeader
            badge="FAQ"
            title={<>Frequently Asked <span className="text-accent">Questions</span></>}
            subtitle="Got questions? We've got answers."
          />
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`} id={`faq-${i}`}>
                  <button
                    className="faq-item__question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className="faq-item__answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-xl);
          align-items: start;
        }
        .pricing-note {
          text-align: center;
          margin-top: var(--space-2xl);
          padding: var(--space-lg) var(--space-xl);
          background: rgba(200, 16, 46, 0.05);
          border: 1px solid rgba(200, 16, 46, 0.15);
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: var(--fs-sm);
        }

        /* COMPARISON TABLE */
        .comparison-table-wrapper {
          overflow-x: auto;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--fs-sm);
        }
        .comparison-table th,
        .comparison-table td {
          padding: var(--space-md) var(--space-lg);
          text-align: center;
          border-bottom: 1px solid var(--color-border);
        }
        .comparison-table th {
          font-family: var(--font-heading);
          font-size: var(--fs-md);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: var(--color-bg-tertiary);
        }
        .comparison-table th:first-child,
        .comparison-table td:first-child {
          text-align: left;
          font-weight: var(--fw-medium);
        }
        .comparison-table__popular {
          background: rgba(200, 16, 46, 0.05) !important;
          color: var(--color-accent);
        }
        .comparison-table td {
          color: var(--color-text-secondary);
        }
        .comparison-table tr:hover td {
          background: var(--color-bg-tertiary);
        }

        /* FAQ */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .faq-item {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition-base);
        }
        .faq-item--open {
          border-color: var(--color-accent);
        }
        .faq-item__question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-lg) var(--space-xl);
          font-size: var(--fs-md);
          font-weight: var(--fw-medium);
          text-align: left;
          background: var(--color-bg-card);
          color: var(--color-text-primary);
          transition: background var(--transition-fast);
        }
        .faq-item__question:hover {
          background: var(--color-bg-card-hover);
        }
        .faq-item__answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-slow), padding var(--transition-slow);
        }
        .faq-item--open .faq-item__answer {
          max-height: 200px;
          padding: 0 var(--space-xl) var(--space-xl);
        }
        .faq-item__answer p {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
        }
        @media (max-width: 768px) {
          .comparison-table th,
          .comparison-table td {
            padding: var(--space-sm) var(--space-md);
            font-size: var(--fs-xs);
          }
          .faq-item__question {
            padding: var(--space-md);
            font-size: var(--fs-sm);
          }
          .faq-item--open .faq-item__answer {
            padding: 0 var(--space-md) var(--space-md);
          }
        }
        @media (max-width: 480px) {
          .pricing-grid {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
