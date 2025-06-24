import { useState } from "react"
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { AuthStyledDiv } from "./AuthStyle";

const Authenticate = () => {

  const [isLoginPage, setIsLoginPage] = useState(true);

  const togglePage = (loginPage) => {
      setIsLoginPage(loginPage);
  }

  return (
    <AuthStyledDiv>
      <div className="login-signup-page">
        { isLoginPage ? <Login togglePage = {togglePage} /> : <Signup togglePage = {togglePage} /> }
      </div>
      <div className="bg-cover">
      </div>
    </AuthStyledDiv>
  )
}

export default Authenticate