import React from 'react'
import { LoginStyledDiv } from './LoginStyle';

const Login = (props) => {
  const { togglePage } = props;


  return (
    <LoginStyledDiv>
      <h2>Login</h2>  
      <button onClick={() => togglePage(false)}>sign up</button>
    </LoginStyledDiv>
    
  )
}

export default Login