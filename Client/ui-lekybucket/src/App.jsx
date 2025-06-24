import { useEffect } from 'react';
import './App.css'
import Routes from './pages/routes/Routes'
import { useDispatch } from 'react-redux'
import { fetchUserDetails } from './redux/auth/authThunks';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem('auth-token');
    const userId = localStorage.getItem('userId');

    if(token && userId) {
      dispatch(fetchUserDetails(userId));
    }
  },[])

  return (
    <>
      <Routes />
    </>
  )
}

export default App
