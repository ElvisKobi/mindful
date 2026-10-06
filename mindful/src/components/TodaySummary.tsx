import useGoalsStore from "../store/useGoalsStore"
import useTrackingStore from "../store/useTrackingStore"


const TodaySummary = () => {
const dailyGoalMinutes = useGoalsStore((state) => state.dailyGoalMinutes)
const appUsage = useTrackingStore((state) => state.appUsage)

const totalMinutesUsed = appUsage.reduce((total, app) => total + app.minutesUsed, 0)
const minutesRemaining = dailyGoalMinutes - totalMinutesUsed
const progressPercent = Math.min((totalMinutesUsed / dailyGoalMinutes) * 100, 100)

const formatTime = (mins: number) => {
    const h = Math.floor(Math.abs(mins) / 60)
    const m = Math.abs(mins) % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }
const barColor =
    progressPercent === 100 ? 'bg-red-500' :
    progressPercent >= 80 ? 'bg-yellow-400' :
    'bg-green-400'


  return (
    <div className="bg-linear-to-br from-green-950 to-green-900 border border-green-800 rounded-2xl p-6 mb-5">
      <p className="text-sm text-green-300 mb-1 tracking-widest uppercase">
        screen time today
      </p>
      <p className="text-5xl font-bold text-green-100 mb-1">
        {formatTime(totalMinutesUsed)}
      </p>
      <p className="text-xs text-gray-400">
        goal: {formatTime(dailyGoalMinutes)} &nbsp;·&nbsp;
        {minutesRemaining < 0
          ? `${formatTime(minutesRemaining)} over`
          : `${formatTime(minutesRemaining)} remaining`}
      </p>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>0</span>
          <span>{formatTime(dailyGoalMinutes)} goal</span>
        </div>
        <div className="h-1.5 bg-green-950 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default TodaySummary