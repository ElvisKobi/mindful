import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
      setIsLoading(false)
    })
  }, [])
    if (isLoading) {
    return (
        <div className="min-h-screen bg-green-950 flex items-center justify-center">
        <p className="text-green-400 text-sm">Loading...</p>
        </div>
    )
    }

    if (isAuthenticated) {
    return <>{children}</>
    }

    return <Navigate to="/login" />
}

export default ProtectedRoute