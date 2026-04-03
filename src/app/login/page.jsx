"use client";

import { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useRouter()

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed.')
        setLoading(false)
        return
      }

      ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).setItem('s4fitness_token', data.token)
      ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).setItem('s4fitness_user', JSON.stringify(data.user))

      if (data.user.role === 'admin') {
        navigate.push('/admin')
      } else {
        navigate.push('/dashboard')
      }
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
            <LogIn size={36} className="text-accent" />
            <h1 style={{ fontSize: 'var(--fs-2xl)', marginTop: 'var(--space-md)' }}>Welcome <span className="text-accent">Back</span></h1>
            <p className="text-muted">Log in to access your S4 Fitness dashboard</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', color: '#f87171', fontSize: 'var(--fs-sm)', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 'var(--fw-medium)' }}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required id="login-email" />
            </div>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 'var(--fw-medium)' }}>Password</label>
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required id="login-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: 36, color: 'var(--color-text-muted)' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button type="submit" className="btn btn--primary btn--full btn--large" disabled={loading} id="login-submit">
              {loading ? <span className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Log In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)', fontSize: 'var(--fs-sm)', color: 'var(--color-text-muted)' }}>
            Don't have an account?{' '}
            <Link href="/register" className="text-accent" style={{ fontWeight: 'var(--fw-semibold)' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
