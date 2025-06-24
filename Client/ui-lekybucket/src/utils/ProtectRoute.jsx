import { isAuthenticated } from './auth'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to = "/" replace/>
}

export default ProtectRoute