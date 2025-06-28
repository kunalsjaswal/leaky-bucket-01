import { LoginStyledDiv } from "./LoginStyle";
import { Button, TextField } from "@mui/material";
import { bgColors } from "../../assets/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/authThunks";

const Login = (props) => {
  const { togglePage } = props;
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);

    // Re-validate on blur
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(email.length > 0 && !emailRegex.test(email));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Validate password length
    if (value.length == 0 || value.length > 6) {
      setPasswordError(false);
      setPasswordErrorMessage("");
    } else {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long");
    }
  };

  const handleOnLoginClick = () => {

    if(email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
      setEmailError(true);
      setEmailTouched(true);
      return;
    }
    
    if(password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long");
      return;
    }

    dispatch(loginUser({ email, password }));

    setEmail("");
    setPassword("");
  }

  return (
    <LoginStyledDiv>
      <div className="login-head">
        <h1>Login to chat app</h1>
        <p>
          Create Account?{" "}
          <Button size="small" onClick={() => togglePage(false)}>
            Sign up
          </Button>
        </p>
      </div>

      <div className="login-form">
        <TextField
          className="login-field"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailTouched && emailError}
          helperText={
            emailTouched && emailError ? "Please enter a valid email" : ""
          }
          size="small"
          fullWidth
          type="email"
          variant="outlined"
        />
        <TextField
          className="login-field"
          label="Password"
          size="small"
          fullWidth
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          helperText={passwordError ? passwordErrorMessage : ""}
        />

        <Button
          fullWidth
          variant="contained"
          className="login-btn"
          sx={{
            marginTop: "2rem",
            backgroundColor: bgColors.loginBtnColor,
            "&:hover": { backgroundColor: bgColors.loginBtnFocusColor },
          }}
          onClick = {handleOnLoginClick}
        >
          LOG IN
        </Button>
      </div>
    </LoginStyledDiv>
  );
};

export default Login;
