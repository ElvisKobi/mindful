import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">

        {/* Logo */}
        <div className="mb-8">
          <p className="text-7xl mb-4">🌿</p>
          <h1 className="font-serif text-5xl font-bold text-green-100 mb-3">
            mindful
          </h1>
          <p className="text-sm text-gray-400 italic">
            reclaim your attention
          </p>
        </div>

        {/* Description */}
        <div className="bg-green-900 border border-green-800 rounded-2xl p-6 mb-8">
          <p className="text-sm text-green-200 leading-relaxed mb-4">
            Mindful helps you break free from doom-scrolling by tracking your screen time, 
            setting healthy limits, and nudging you back to the present moment.
          </p>
          <div className="flex flex-col gap-2 text-xs text-gray-400">
            <p>📱 Track screen time per app</p>
            <p>🎯 Set daily goals and limits</p>
            <p>🌿 Mindful prompts when you need them</p>
            <p>🔥 Build streaks and stay consistent</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-green-400 text-green-950 font-medium text-sm py-4 rounded-2xl"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-transparent border border-green-700 text-green-400 text-sm py-4 rounded-2xl"
          >
            I already have an account
          </button>
        </div>

      </div>
    </div>
  )
}

export default Welcome