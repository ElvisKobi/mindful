import { create } from "zustand";


type AppUsage =  {
    appId:string
    appName: string
    minutesUsed: number
}

type TrackingStore = {
    appUsage: AppUsage[]
    setMinutesUsed: (appId: string, mins: number) => void
}

const useTrackingStore = create<TrackingStore>()((set) => ({
  appUsage: [
    { appId: 'instagram', appName: 'Instagram', minutesUsed: 52 },
    { appId: 'tiktok', appName: 'TikTok', minutesUsed: 18 },
    { appId: 'youtube', appName: 'YouTube', minutesUsed: 24 },
    { appId: 'twitter', appName: 'Twitter / X', minutesUsed: 28 },
  ],
  setMinutesUsed: (appId, mins) =>
    set((state) => ({
      appUsage: state.appUsage.map((app) =>
        app.appId === appId ? { ...app, minutesUsed: mins } : app
      ),
    })),
}))

export default useTrackingStore