import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate('/today')
  }

  return (
    <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-green-100 mb-2">
            🌿 mindful
          </h1>
          <p className="text-sm text-gray-400 italic">
            reclaim your attention
          </p>
        </div>

        {/* Form */}
        <div className="bg-green-900 border border-green-700 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-green-950 border border-green-700 rounded-xl px-4 py-3 text-sm text-green-100 placeholder-gray-600 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-green-950 border border-green-700 rounded-xl px-4 py-3 text-sm text-green-100 placeholder-gray-600 outline-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950 border border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-400 text-green-950 font-medium text-sm py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-xs text-center text-gray-400">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-green-400 cursor-pointer"
            >
              Create one
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login