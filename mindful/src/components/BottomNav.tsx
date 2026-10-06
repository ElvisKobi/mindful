import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const BottomNav = () => {
  const { pathname } = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
    })
  }, [])

  const isToday   = pathname === '/today'
  const isGoals   = pathname === '/goals'
  const isReflect = pathname === '/reflect'

  // Hide on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register'
  if (isAuthPage) return null

  if (!isAuthenticated) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-green-900 border-t border-green-700 flex justify-around items-center py-3 px-6">
      <Link
        to="/today"
        className={`text-xs uppercase tracking-widest ${isToday ? 'text-green-400' : 'text-gray-500'}`}
      >
        Today
      </Link>
      <Link
        to="/goals"
        className={`text-xs uppercase tracking-widest ${isGoals ? 'text-green-400' : 'text-gray-500'}`}
      >
        Goals
      </Link>
      <Link
        to="/reflect"
        className={`text-xs uppercase tracking-widest ${isReflect ? 'text-green-400' : 'text-gray-500'}`}
      >
        Reflect
      </Link>
    </div>
  )
}

export default BottomNav