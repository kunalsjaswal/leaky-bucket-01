import { useEffect } from 'react';
import './App.css'
import Routes from './pages/routes/Routes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from './redux/auth/authThunks';
import styled from 'styled-components';
import { hideAlert } from './redux/alert/alertSlice';
import CommonAlert from './common/alert/CommonAlert';
import CommonLoading from './common/loading/CommonLoading';

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(()=>{
    const token = localStorage.getItem('auth-token');
    const userId = localStorage.getItem('userId');

    if(token && userId) {
      dispatch(fetchUserDetails(userId));
    }
  },[isAuthenticated])

  const { isVisible, message, type } = useSelector(state => state.alert);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  
  return (
    <AppWrapper> 
      { 
        isVisible &&
        <CommonAlert message={message} type={type} />
      }
      {
        loading && 
        <CommonLoading />
      }
        <Routes />
    </AppWrapper>
  )
}

export default App
