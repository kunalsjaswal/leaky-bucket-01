import { useEffect } from 'react';
import './App.css'
import Routes from './pages/routes/Routes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from './redux/auth/authThunks';
import styled from 'styled-components';
import { hideAlert } from './redux/alert/alertSlice';
import CommonAlert from './components/alert/CommonAlert';

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
        <Routes />
    </AppWrapper>
  )
}

export default App
