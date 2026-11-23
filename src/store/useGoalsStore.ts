import { create } from "zustand";

type AppLimit = {
    appId: string
    appName: string
    icon: string
    limit: number
}

type GoalsStore = {
    dailyGoalMinutes: number
    appLimits: AppLimit[]
    setDailyGoal: (minutes: number) => void
    setAppLimit: (appId: string, limit: number) => void
}

const useGoalsStore = create<GoalsStore>()((set)=> ({
    dailyGoalMinutes: 120, 
    appLimits: [
            { appId: 'instagram', appName: 'Instagram', icon: '📸', limit: 30 },
            { appId: 'tiktok', appName: 'TikTok', icon: '🎵', limit: 20 },
            { appId: 'youtube', appName: 'YouTube', icon: '▶️', limit: 60 },
            { appId: 'twitter', appName: 'Twitter/X', icon: '🐦', limit: 45 },
        ],

    setDailyGoal: (minutes) => set({ dailyGoalMinutes: minutes}),
    setAppLimit: (appId, limit) =>
        set((state) => ({
            appLimits: state.appLimits.map((app) =>
            app.appId === appId ? {...app, limit} : app
            )
        }))
}))

export default useGoalsStore