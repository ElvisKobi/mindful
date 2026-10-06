import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Today from './pages/Today'
import Goals from './pages/Goals'
import Reflect from './pages/Reflect'
import Login from './pages/Login'
import Register from './pages/Register'
import BottomNav from './components/BottomNav'
import ProtectedRoute from './components/ProtectedRoute'
import Welcome from './pages/Welcome'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/today"
          element={
            <ProtectedRoute>
              <Today />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reflect"
          element={
            <ProtectedRoute>
              <Reflect />
            </ProtectedRoute>
          }
        />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App