import useGoalsStore from '../store/useGoalsStore'
import useTrackingStore from '../store/useTrackingStore'

type AppListProps = {
  onAppBlocked: (appName: string) => void
}

const AppList = ({ onAppBlocked }: AppListProps) => {
  const appLimits = useGoalsStore((state) => state.appLimits)
  const appUsage = useTrackingStore((state) => state.appUsage)

  return (
    <div className="flex flex-col gap-3 mb-5">
      {appLimits.map((app) => {
        const usage = appUsage.find((u) => u.appId === app.appId)
        const minutesUsed = usage?.minutesUsed ?? 0
        const isOver = minutesUsed > app.limit
        const pct = Math.min((minutesUsed / app.limit) * 100, 100)
        const barColor = isOver ? 'bg-red-500' : pct >= 80 ? 'bg-yellow-400' : 'bg-green-400'

        return (
          <div
            key={app.appId}
            onClick={() => isOver && onAppBlocked(app.appName)}
            className={`bg-green-950 border rounded-2xl p-4 flex items-center gap-4 ${isOver ? 'border-red-500/40 cursor-pointer' : 'border-green-800'}`}
          >
            <div className="flex-1">
              <p className="text-sm text-green-100 mb-1">{app.icon} {app.appName}</p>
              <p className="text-xs text-gray-400">
                {minutesUsed}m used · {app.limit}m limit
              </p>
              <div className="h-1 bg-green-900 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            {isOver && (
              <span className="text-xs text-red-400 border border-red-500/30 px-2 py-1 rounded-lg">
                blocked
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AppList