"use client";

import Link from 'next/link';

import { ArrowRight, Dumbbell, Flame, Heart, Users, Target, Trophy, Swords, Timer, Bike } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import ScrollReveal from '../../components/ScrollReveal'

const services = [
  {
    icon: <Dumbbell size={36} />,
    title: 'Gym Floor Access',
    desc: 'Full access to our 15,000 sq ft gym floor with 200+ pieces of premium equipment from Hammer Strength, Rogue, and Technogym. Includes free weights, machines, and dedicated stretching zones.',
    features: ['Free Weights Zone', 'Machine Circuit', 'Functional Training Area', 'Stretching Zone'],
  },
  {
    icon: <Target size={36} />,
    title: 'Personal Training',
    desc: 'One-on-one sessions with certified trainers who create customized programs based on your goals, body type, and fitness level. Includes regular progress tracking and plan adjustments.',
    features: ['Custom Workout Plans', 'Nutrition Guidance', 'Progress Tracking', 'Body Composition Analysis'],
  },
  {
    icon: <Flame size={36} />,
    title: 'HIIT Training',
    desc: 'High-intensity interval training sessions designed to maximize calorie burn and improve cardiovascular fitness. Perfect for fat loss and building endurance in a time-efficient manner.',
    features: ['45-Min Sessions', 'Full-Body Workouts', 'Heart Rate Monitoring', 'Calorie Tracking'],
  },
  {
    icon: <Heart size={36} />,
    title: 'Yoga & Meditation',
    desc: 'From power yoga to restorative sessions, our certified instructors guide you through practices that improve flexibility, reduce stress, and enhance mind-body connection.',
    features: ['Hatha Yoga', 'Power Yoga', 'Guided Meditation', 'Breathing Workshops'],
  },
  {
    icon: <Users size={36} />,
    title: 'Group Classes',
    desc: 'Energy-packed group fitness sessions that keep you motivated and accountable. Choose from a variety of formats designed for all fitness levels.',
    features: ['Zumba', 'Aerobics', 'Dance Fitness', 'Boot Camp'],
  },
  {
    icon: <Swords size={36} />,
    title: 'Boxing & MMA',
    desc: 'Learn striking fundamentals, self-defense techniques, and get an incredible full-body workout with our experienced martial arts coaches.',
    features: ['Boxing Basics', 'Kickboxing', 'Self-Defense', 'Sparring Sessions'],
  },
  {
    icon: <Trophy size={36} />,
    title: 'Strength & Powerlifting',
    desc: 'Specialized programming for those focused on building maximum strength. Includes dedicated powerlifting platforms and competition-grade equipment.',
    features: ['Squat Racks', 'Deadlift Platforms', 'Competition Prep', 'Form Coaching'],
  },
  {
    icon: <Timer size={36} />,
    title: 'CrossFit Training',
    desc: 'Constantly varied, high-intensity functional movements. Our CrossFit program builds well-rounded athletes ready for any physical challenge.',
    features: ['WOD Programming', 'Olympic Lifting', 'Gymnastics Movements', 'Skill Development'],
  },
  {
    icon: <Bike size={36} />,
    title: 'Spin Classes',
    desc: 'Indoor cycling classes with immersive lighting and beats. Ride to the rhythm while burning calories and building lower body strength.',
    features: ['Music-Driven Rides', 'Instructor-Led', 'Performance Metrics', 'All Levels Welcome'],
  },
]

export default function Services() {
  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="container">
          <span className="badge">Our Programs</span>
          <h1>Services & <span className="text-accent">Programs</span></h1>
          <p>From powerlifting to yoga — discover the programs designed to help you achieve any fitness goal.</p>
        </div>
      </div>

      <section className="section" id="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="service-card card" id={`service-${i}`}>
                  <div className="service-card__icon">{service.icon}</div>
                  <div className="service-card__content">
                    <h3 className="service-card__title">{service.title}</h3>
                    <p className="service-card__desc">{service.desc}</p>
                    <div className="service-card__features">
                      {service.features.map((f, j) => (
                        <span key={j} className="service-card__feature">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark" id="services-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2>Not Sure Which Program<br /><span className="text-accent">Is Right for You?</span></h2>
            <div className="divider" style={{ margin: 'var(--space-md) auto' }} />
            <p className="text-muted" style={{ fontSize: 'var(--fs-lg)', maxWidth: '500px', margin: '0 auto var(--space-2xl)' }}>
              Book a free consultation with one of our trainers to find the perfect program for your goals.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn--primary btn--large" id="services-consult-btn">
                Free Consultation <ArrowRight size={20} />
              </Link>
              <Link href="/membership" className="btn btn--secondary btn--large" id="services-pricing-btn">
                View Pricing
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-xl);
        }
        .service-card {
          padding: var(--space-2xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          height: 100%;
        }
        .service-card__icon {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          background: rgba(200, 16, 46, 0.1);
          color: var(--color-accent);
          border: 1px solid rgba(200, 16, 46, 0.2);
          transition: all var(--transition-base);
        }
        .service-card:hover .service-card__icon {
          background: var(--color-accent);
          color: white;
          box-shadow: var(--shadow-accent);
        }
        .service-card__content {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          flex: 1;
        }
        .service-card__title {
          font-size: var(--fs-xl);
        }
        .service-card__desc {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          line-height: 1.7;
        }
        .service-card__features {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-top: auto;
        }
        .service-card__feature {
          font-size: var(--fs-xs);
          padding: 0.25rem 0.75rem;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
