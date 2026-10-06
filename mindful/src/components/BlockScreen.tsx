import { useState } from 'react'
import useMindfulStore from '../store/useMindfulStore'

type BlockScreenProps = {
  appName: string
  isVisible: boolean
  onDismiss: () => void
}

const BlockScreen = ({ appName, isVisible, onDismiss }: BlockScreenProps) => {
  const prompts = useMindfulStore((state) => state.prompts)
  const currentIndex = useMindfulStore((state) => state.currentIndex)
  const currentPrompt = prompts[currentIndex]

  const [isBreathing, setIsBreathing] = useState(false)
  const [breathLabel, setBreathLabel] = useState('breathe in...')

  if (!isVisible) return null

  const startBreathing = () => {
    setIsBreathing(true)
    const labels = ['breathe in...', 'hold...', 'breathe out...', 'hold...']
    let i = 0
    setInterval(() => {
      i = (i + 1) % labels.length
      setBreathLabel(labels[i])
    }, 4000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center px-8 text-center">
      {!isBreathing ? (
        <>
          <p className="text-6xl mb-6">🚫</p>
          <h2 className="text-3xl font-bold text-red-400 mb-3">{appName}</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
            You've reached your daily limit for this app. Your mind deserves a break.
          </p>
          <p className="font-serif italic text-lg text-green-200 leading-relaxed mb-8 max-w-xs">
            "{currentPrompt.prompt}"
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={startBreathing}
              className="border border-green-500 text-green-400 text-sm py-4 rounded-xl tracking-widest uppercase"
            >
              Breathe with me →
            </button>
            <button
              onClick={onDismiss}
              className="bg-green-950 border border-green-800 text-gray-400 text-sm py-3 rounded-xl"
            >
              I'll resist — close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-24 h-24 rounded-full border-2 border-green-400/40 bg-green-400/10 animate-pulse mb-6" />
          <p className="text-green-400 text-sm uppercase tracking-widest mb-2">
            {breathLabel}
          </p>
          <p className="text-xs text-gray-500 mb-8">
            4 seconds in · 4 hold · 4 out
          </p>
          <button
            onClick={onDismiss}
            className="bg-green-950 border border-green-800 text-gray-400 text-sm py-3 px-8 rounded-xl"
          >
            Done — I feel better
          </button>
        </>
      )}
    </div>
  )
}

export default BlockScreen