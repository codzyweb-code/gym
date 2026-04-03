"use client";

import Link from 'next/link';

import { ArrowRight, Play, Users, Dumbbell, Trophy, Clock, Flame, Heart, Target, ChevronRight, Star } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import AnimatedCounter from '../components/AnimatedCounter'
import ScrollReveal from '../components/ScrollReveal'
import TestimonialCard from '../components/TestimonialCard'
import TrainerCard from '../components/TrainerCard'

const programs = [
  { icon: <Dumbbell size={32} />, title: 'Strength Training', desc: 'Build raw power with free weights, machines, and progressive overload programming.' },
  { icon: <Flame size={32} />, title: 'HIIT Cardio', desc: 'Torch calories with high-intensity interval training designed for maximum fat burn.' },
  { icon: <Heart size={32} />, title: 'Yoga & Flexibility', desc: 'Improve mobility, reduce stress, and enhance recovery with guided yoga sessions.' },
  { icon: <Target size={32} />, title: 'Personal Training', desc: 'One-on-one coaching tailored to your goals with certified expert trainers.' },
  { icon: <Users size={32} />, title: 'Group Classes', desc: 'Energy-packed group sessions that keep you motivated and accountable.' },
  { icon: <Trophy size={32} />, title: 'Competition Prep', desc: 'Specialized programs for bodybuilding, powerlifting, and athletic competitions.' },
]

const testimonials = [
  { name: 'Arjun Mehta', role: 'Member for 2 years', text: 'S4 FITNESS completely transformed my fitness journey. The trainers are incredibly knowledgeable, and the community keeps me coming back every single day. Lost 20kg in 8 months!', rating: 5 },
  { name: 'Priya Sharma', role: 'Member for 1 year', text: 'The HIIT classes are absolutely incredible. I\'ve never felt more energized and strong. The atmosphere here is electrifying — it pushes you to give your best every session.', rating: 5 },
  { name: 'Rahul S.', role: 'Member', text: 'Best gym in Sulthan Bathery, without a doubt. The equipment is top-tier, always maintained, and the trainers actually care about your progress.', rating: 5 },
]

const trainers = [
  { name: 'Sanal', role: 'Head Trainer', specialization: 'Strength & Conditioning', experience: 8, instagram: '#' },
  { name: 'Bibin', role: 'Functional Training', specialization: 'CrossFit & Mobility', experience: 6, instagram: '#' },
  { name: 'Shyam', role: 'HIIT Specialist', specialization: 'Fat Loss & HIIT', experience: 5, instagram: '#' },
  { name: 'Arjun', role: 'Nutritionist', specialization: 'Sports Nutrition', experience: 4, instagram: '#' },
]

export default function Home() {
  return (
    <div className="page-enter">
      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <div className="hero__gradient" />
          <div className="hero__pattern" />
        </div>
        <div className="container hero__content">
          <ScrollReveal>
            <span className="badge" style={{ marginBottom: 'var(--space-lg)' }}>🔥 Sulthan Bathery's #1 Gym</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="hero__title">
              Transform Your Body.<br />
              <span className="text-gradient">Elevate Your Life.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="hero__subtitle">
              World-class trainers, cutting-edge equipment, and a community that pushes you
              beyond limits. Your transformation starts here.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="hero__actions">
              <Link href="/membership" className="btn btn--primary btn--large" id="hero-join-btn">
                Join Now <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className="btn btn--secondary btn--large" id="hero-trial-btn">
                <Play size={18} /> Free Trial
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">500+</span>
                <span className="hero__stat-label">Active Members</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">15+</span>
                <span className="hero__stat-label">Expert Trainers</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">3+</span>
                <span className="hero__stat-label">Years Legacy</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="section" id="programs-section">
        <div className="container">
          <SectionHeader
            badge="Our Programs"
            title={<>What We <span className="text-accent">Offer</span></>}
            subtitle="From hardcore strength training to mindful yoga — we have everything you need to reach your fitness goals."
          />
          <div className="programs-grid">
            {programs.map((program, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="program-card card" id={`program-${i}`}>
                  <div className="program-card__icon">{program.icon}</div>
                  <h3 className="program-card__title">{program.title}</h3>
                  <p className="program-card__desc">{program.desc}</p>
                  <Link href="/services" className="program-card__link">
                    Learn More <ChevronRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section section--dark" id="about-preview">
        <div className="container">
          <div className="about-preview">
            <ScrollReveal direction="left" className="about-preview__content">
              <span className="badge">About S4 FITNESS</span>
              <h2>More Than a Gym.<br /><span className="text-accent">A Movement.</span></h2>
              <div className="divider" />
              <p>Started in 2023, S4 FITNESS was built with one goal: to bring a truly world-class fitness facility to Sulthan Bathery. We focus on real results through heavy lifting, properly structured programs, and quality coaching.</p>
              <p>Our 15,000 sq. ft. facility houses the latest equipment from Hammer Strength, Rogue, and Technogym — providing an unmatched training experience.</p>
              <div className="about-preview__features">
                <div className="about-preview__feature">
                  <Clock size={20} className="text-accent" />
                  <span>Open 18 Hours Daily</span>
                </div>
                <div className="about-preview__feature">
                  <Dumbbell size={20} className="text-accent" />
                  <span>200+ Equipment Units</span>
                </div>
                <div className="about-preview__feature">
                  <Users size={20} className="text-accent" />
                  <span>Expert Certified Trainers</span>
                </div>
                <div className="about-preview__feature">
                  <Trophy size={20} className="text-accent" />
                  <span>Award-Winning Programs</span>
                </div>
              </div>
              <Link href="/about" className="btn btn--primary" id="about-learn-more-btn">
                Our Story <ArrowRight size={18} />
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right" className="about-preview__visual">
              <div className="about-preview__image-stack">
                <div className="about-preview__img about-preview__img--1" />
                <div className="about-preview__img about-preview__img--2" />
                <div className="about-preview__accent-box">
                  <span className="about-preview__accent-number">10+</span>
                  <span className="about-preview__accent-label">Years of Excellence</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ANIMATED STATS */}
      <section className="section stats-section" id="stats-section">
        <div className="container">
          <div className="stats-grid">
            <AnimatedCounter end={500} suffix="+" label="Active Members" />
            <AnimatedCounter end={15} suffix="+" label="Expert Trainers" />
            <AnimatedCounter end={50} suffix="+" label="Weekly Classes" />
            <AnimatedCounter end={3} suffix="+" label="Years Experience" />
          </div>
        </div>
      </section>

      {/* TRAINERS SECTION */}
      <section className="section section--dark" id="trainers-section">
        <div className="container">
          <SectionHeader
            badge="Our Team"
            title={<>Meet Your <span className="text-accent">Trainers</span></>}
            subtitle="Certified professionals dedicated to helping you achieve your fitness goals."
          />
          <div className="grid grid--4">
            {trainers.map((trainer, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <TrainerCard {...trainer} />
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
            <Link href="/about" className="btn btn--secondary" id="view-all-trainers-btn">
              View All Trainers <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials-section">
        <div className="container">
          <SectionHeader
            badge="Testimonials"
            title={<>What Our Members <span className="text-accent">Say</span></>}
            subtitle="Real stories from real members who transformed their lives with S4 FITNESS."
          />
          <div className="grid grid--3">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <TestimonialCard {...t} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section" id="cta-section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-box">
              <h2>Ready to <span className="text-gradient">Transform</span> Your Life?</h2>
              <p>Join S4 FITNESS today and get your first week FREE. No contracts, no commitments — just results.</p>
              <div className="cta-box__actions">
                <Link href="/membership" className="btn btn--primary btn--large" id="cta-join-btn">
                  Start Your Journey <ArrowRight size={20} />
                </Link>
                <Link href="/contact" className="btn btn--secondary btn--large" id="cta-contact-btn">
                  Contact Us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--nav-height);
        }
        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(201, 168, 76, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(10,10,10,0.95) 100%);
        }
        .hero__pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero__content {
          position: relative;
          z-index: 2;
          padding: var(--space-4xl) 0;
        }
        .hero__title {
          margin-bottom: var(--space-xl);
          max-width: 800px;
        }
        .hero__subtitle {
          font-size: var(--fs-lg);
          color: var(--color-text-secondary);
          max-width: 600px;
          line-height: 1.8;
          margin-bottom: var(--space-2xl);
        }
        .hero__actions {
          display: flex;
          gap: var(--space-md);
          flex-wrap: wrap;
          margin-bottom: var(--space-4xl);
        }
        .hero__stats {
          display: flex;
          align-items: center;
          gap: var(--space-2xl);
          padding: var(--space-xl) var(--space-2xl);
          background: var(--color-bg-glass);
          backdrop-filter: blur(16px);
          border: 1px solid var(--color-bg-glass-border);
          border-radius: var(--radius-lg);
          width: fit-content;
        }
        .hero__stat {
          display: flex;
          flex-direction: column;
        }
        .hero__stat-number {
          font-family: var(--font-heading);
          font-size: var(--fs-2xl);
          font-weight: var(--fw-bold);
          color: var(--color-accent);
        }
        .hero__stat-label {
          font-size: var(--fs-xs);
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .hero__stat-divider {
          width: 1px;
          height: 40px;
          background: var(--color-border);
        }

        /* PROGRAMS */
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-xl);
        }
        .program-card {
          padding: var(--space-2xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .program-card__icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          background: rgba(201, 168, 76, 0.1);
          color: var(--color-accent);
          border: 1px solid rgba(201, 168, 76, 0.2);
        }
        .program-card__title {
          font-size: var(--fs-xl);
        }
        .program-card__desc {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          line-height: 1.7;
          flex: 1;
        }
        .program-card__link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--color-accent);
          font-size: var(--fs-sm);
          font-weight: var(--fw-semibold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: gap var(--transition-base);
        }
        .program-card__link:hover {
          gap: var(--space-sm);
        }

        /* ABOUT PREVIEW */
        .about-preview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4xl);
          align-items: center;
        }
        .about-preview__content {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .about-preview__content p {
          color: var(--color-text-secondary);
          line-height: 1.8;
        }
        .about-preview__features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
          margin: var(--space-lg) 0;
        }
        .about-preview__feature {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: var(--fs-sm);
          font-weight: var(--fw-medium);
        }
        .about-preview__visual {
          position: relative;
        }
        .about-preview__image-stack {
          position: relative;
          height: 500px;
        }
        .about-preview__img {
          position: absolute;
          border-radius: var(--radius-lg);
          border: 2px solid var(--color-border);
        }
        .about-preview__img--1 {
          top: 0;
          left: 0;
          width: 70%;
          height: 70%;
          background: linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-card) 100%);
          z-index: 1;
        }
        .about-preview__img--2 {
          bottom: 0;
          right: 0;
          width: 65%;
          height: 60%;
          background: linear-gradient(135deg, rgba(201,168,76,0.1) 0%, var(--color-bg-tertiary) 100%);
          z-index: 2;
        }
        .about-preview__accent-box {
          position: absolute;
          bottom: 40%;
          left: 55%;
          background: var(--color-accent);
          color: white;
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
          z-index: 3;
          text-align: center;
          box-shadow: var(--shadow-accent);
        }
        .about-preview__accent-number {
          display: block;
          font-family: var(--font-heading);
          font-size: var(--fs-4xl);
          font-weight: var(--fw-bold);
          line-height: 1;
        }
        .about-preview__accent-label {
          font-size: var(--fs-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.9;
        }

        /* STATS */
        .stats-section {
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: var(--space-3xl) 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-xl);
        }

        /* CTA */
        .cta-section {
          padding: var(--space-5xl) 0;
        }
        .cta-box {
          text-align: center;
          padding: var(--space-4xl);
          background: linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.05) 100%);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 60%);
          animation: spin 20s linear infinite;
          pointer-events: none;
        }
        .cta-box h2 {
          position: relative;
          margin-bottom: var(--space-md);
        }
        .cta-box p {
          position: relative;
          color: var(--color-text-secondary);
          font-size: var(--fs-lg);
          max-width: 500px;
          margin: 0 auto var(--space-2xl);
        }
        .cta-box__actions {
          position: relative;
          display: flex;
          justify-content: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .programs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .about-preview {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }
          .about-preview__image-stack {
            height: 400px;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding-top: var(--nav-height);
            padding-bottom: var(--space-2xl);
          }
          .hero__content {
            padding: var(--space-2xl) 0;
          }
          .hero__title {
            word-break: break-word;
          }
          .hero__subtitle {
            font-size: var(--fs-base);
          }
          .hero__stats {
            flex-direction: column;
            gap: var(--space-md);
            width: 100%;
            padding: var(--space-lg);
          }
          .hero__stat-divider {
            width: 40px;
            height: 1px;
          }
          .hero__stat {
            align-items: center;
          }
          .programs-grid {
            grid-template-columns: 1fr;
          }
          .about-preview__features {
            grid-template-columns: 1fr;
          }
          .about-preview__image-stack {
            height: 280px;
          }
          .about-preview__accent-box {
            padding: var(--space-md);
          }
          .about-preview__accent-number {
            font-size: var(--fs-2xl);
          }
          .cta-box {
            padding: var(--space-xl) var(--space-md);
          }
          .cta-box p {
            font-size: var(--fs-base);
          }
        }
        @media (max-width: 480px) {
          .hero__actions {
            flex-direction: column;
          }
          .hero__actions .btn {
            width: 100%;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  )
}
