import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/index' 
import { isTokenValid } from '@/utils/is-token-valid'

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  return isLoggedIn && isTokenValid() ? <Outlet /> : <Navigate to="/sign-in" />
}

export default ProtectedRoute