import useGoalsStore from '../store/useGoalsStore'

const Goals = () => {
  const dailyGoalMinutes = useGoalsStore((state) => state.dailyGoalMinutes)
  const appLimits = useGoalsStore((state) => state.appLimits)
  const setDailyGoal = useGoalsStore((state) => state.setDailyGoal)
  const setAppLimit = useGoalsStore((state) => state.setAppLimit)

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  return (
    <div className="max-w-md mx-auto px-6 py-4 pb-24">

      {/* Daily Screen Limit */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        daily screen limit
      </p>
      <div className="bg-green-950 border border-green-800 rounded-2xl p-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-green-100">📱 Total screen time</p>
          <span className="text-xs bg-green-900 text-green-400 px-2 py-1 rounded-lg">
            daily
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={30}
            max={480}
            step={15}
            value={dailyGoalMinutes}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
            className="flex-1 accent-green-400"
          />
          <span className="text-sm text-green-200 min-w-12 text-right">
            {formatTime(dailyGoalMinutes)}
          </span>
        </div>
      </div>

      {/* Per App Limits */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        per-app limits
      </p>
      <div className="flex flex-col gap-3 mb-5">
        {appLimits.map((app) => (
          <div key={app.appId} className="bg-green-950 border border-green-800 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-green-100">{app.icon} {app.appName}</p>
              <span className="text-xs bg-red-950 text-red-400 px-2 py-1 rounded-lg">
                limit
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={app.limit}
                onChange={(e) => setAppLimit(app.appId, Number(e.target.value))}
                className="flex-1 accent-green-400"
              />
              <span className="text-sm text-green-200 min-w-12 text-right">
                {formatTime(app.limit)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Blocking Settings */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        blocking settings
      </p>
      <div className="bg-green-950 border border-green-800 rounded-2xl p-5 mb-5">
        {[
          { icon: '🚫', label: 'Block when limit hit' },
          { icon: '🕯', label: 'Mindful prompts' },
          { icon: '🌙', label: 'Wind-down mode (9 PM)' },
        ].map((setting, i) => (
          <div
            key={i}
            className={`flex justify-between items-center ${i < 2 ? 'mb-4' : ''}`}
          >
            <p className="text-sm text-green-100">{setting.icon} {setting.label}</p>
            <div className="w-10 h-6 bg-green-800 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-green-400 rounded-full absolute top-1 right-1" />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-green-400 text-green-950 font-medium text-sm py-4 rounded-2xl">
        Save Settings
      </button>

    </div>
  )
}

export default Goals