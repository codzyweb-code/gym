"use client";

import { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useRouter()

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed.')
        setLoading(false)
        return
      }

      ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).setItem('s4fitness_token', data.token)
      ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).setItem('s4fitness_user', JSON.stringify(data.user))

      // New user goes to dashboard (shows no-membership page)
      navigate.push('/dashboard')
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running.')
    }
    setLoading(false)
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-4xl))', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="glass-card" style={{ padding: 'var(--space-2xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <UserPlus size={36} className="text-accent" />
            <h1 style={{ fontSize: 'var(--fs-2xl)', marginTop: 'var(--space-md)' }}>Join <span className="text-accent">S4 Fitness</span></h1>
            <p className="text-muted">Create your account to start your fitness journey</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', color: '#f87171', fontSize: 'var(--fs-sm)', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 'var(--fw-medium)' }}>Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required id="register-name" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 'var(--fw-medium)' }}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required id="register-email" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 'var(--fw-medium)' }}>Phone</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" id="register-phone" />
            </div>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 'var(--fw-medium)' }}>Password</label>
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required id="register-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: 36, color: 'var(--color-text-muted)' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 'var(--fw-medium)' }}>Confirm Password</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" required id="register-confirm" />
            </div>
            <button type="submit" className="btn btn--primary btn--full btn--large" disabled={loading} id="register-submit" style={{ marginTop: 'var(--space-sm)' }}>
              {loading ? <span className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)', fontSize: 'var(--fs-sm)', color: 'var(--color-text-muted)' }}>
            Already a member?{' '}
            <Link href="/login" className="text-accent" style={{ fontWeight: 'var(--fw-semibold)' }}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
