import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.trim().toLowerCase() })

    if (error) {
      if (error.code === '23505') {
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
      return
    }

    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div class="max-w-md mx-auto text-center" data-testid="waitlist-success">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-white">Vous êtes inscrit !</p>
        <p class="text-sm text-white/70 mt-1">Nous vous préviendrons dès le lancement.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" data-testid="waitlist-form">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
        placeholder="votre@email.com"
        required
        className="flex-1 px-5 py-3.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all backdrop-blur-sm"
        data-testid="waitlist-email-input"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-3.5 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
        data-testid="waitlist-submit-btn"
      >
        {status === 'loading' ? 'Envoi...' : 'Rejoindre'}
      </button>
      {status === 'duplicate' && (
        <p className="sm:absolute sm:-bottom-8 text-xs text-amber-300 mt-2 sm:mt-0 text-center w-full" data-testid="waitlist-duplicate-msg">
          Cet email est déjà inscrit sur la liste.
        </p>
      )}
      {status === 'error' && (
        <p className="sm:absolute sm:-bottom-8 text-xs text-red-300 mt-2 sm:mt-0 text-center w-full" data-testid="waitlist-error-msg">
          Une erreur est survenue. Réessayez.
        </p>
      )}
    </form>
  )
}
