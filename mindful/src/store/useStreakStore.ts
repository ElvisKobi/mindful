import {create} from "zustand";

type DayStatus = 'met' | 'partial' | 'missed'

type StreakDay = {
    date: string
    status: DayStatus
}

type StreakStore = {
    currentStreak: number
    longestStreak: number
    streakDays: StreakDay[]
}

const useStreakStore = create<StreakStore>()(() => ({
  currentStreak: 7,
  longestStreak: 14,
  streakDays: [
    { date: '2026-09-01', status: 'met' },
    { date: '2026-09-02', status: 'met' },
    { date: '2026-09-03', status: 'missed' },
    { date: '2026-09-04', status: 'met' },
    { date: '2026-09-05', status: 'partial' },
    { date: '2026-09-06', status: 'met' },
    { date: '2026-09-07', status: 'met' },
    { date: '2026-09-08', status: 'met' },
    { date: '2026-09-09', status: 'missed' },
    { date: '2026-09-10', status: 'met' },
    { date: '2026-09-11', status: 'met' },
    { date: '2026-09-12', status: 'partial' },
    { date: '2026-09-13', status: 'met' },
    { date: '2026-09-14', status: 'met' },
    { date: '2026-09-15', status: 'met' },
    { date: '2026-09-16', status: 'met' },
    { date: '2026-09-17', status: 'met' },
    { date: '2026-09-18', status: 'met' },
    { date: '2026-09-19', status: 'met' },
    { date: '2026-09-20', status: 'missed' },
    { date: '2026-09-21', status: 'met' },
    { date: '2026-09-22', status: 'met' },
    { date: '2026-09-23', status: 'met' },
    { date: '2026-09-24', status: 'met' },
    { date: '2026-09-25', status: 'met' },
    { date: '2026-09-26', status: 'met' },
    { date: '2026-09-27', status: 'met' },
  ],
}))

export default useStreakStore
