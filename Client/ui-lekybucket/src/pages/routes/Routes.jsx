import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'
import Authenticate from '../authenticate/Authenticate'
import Dashboard from '../dashboard/Dashboard'
import PublicRoute from '../../utils/PublicRoute'
import ProtectRoute from '../../utils/ProtectRoute'

const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" element={  
            <PublicRoute>
              <Authenticate />
            </PublicRoute> 
          } /> 
          <Route path="/dashboard" element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          } />
          <Route path="*" element={<div>Page not found</div>} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes