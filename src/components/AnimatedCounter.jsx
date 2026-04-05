"use client";

import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '', label }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  return (
    <div className="counter" ref={ref}>
      <div className="counter__number">
        {prefix}{count}{suffix}
      </div>
      <div className="counter__label">{label}</div>
      <style>{`
        .counter {
          text-align: center;
          padding: var(--space-lg);
        }
        .counter__number {
          font-family: var(--font-heading);
          font-size: var(--fs-4xl);
          font-weight: var(--fw-bold);
          color: var(--color-accent);
          line-height: 1;
          margin-bottom: var(--space-sm);
          text-shadow: 
            0 0 10px rgba(200, 16, 46, 0.6),
            0 0 20px rgba(200, 16, 46, 0.4);
          animation: lunarPulse 4s ease-in-out infinite;
        }
        .counter__label {
          font-size: var(--fs-sm);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-secondary);
          font-weight: var(--fw-medium);
        }
      `}</style>
    </div>
  )
}
