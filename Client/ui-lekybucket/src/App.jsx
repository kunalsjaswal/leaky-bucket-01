import { useEffect } from 'react';
import './App.css'
import Routes from './pages/routes/Routes'
import { useDispatch } from 'react-redux'
import { fetchUserDetails } from './redux/auth/authThunks';
import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

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
    <AppWrapper>
      <Routes />
    </AppWrapper>
  )
}

export default App
