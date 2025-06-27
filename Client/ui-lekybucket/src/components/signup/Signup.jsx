import { SignupStyledDiv } from "./SingupStyle";
import { Button, TextField } from "@mui/material";
import { bgColors } from "../../assets/colors";
import { useState } from "react";
import { showAlertWithTimeout } from "../../redux/alert/alertSlice";
import { useDispatch } from "react-redux";

const Signup = (props) => {
  const { togglePage } = props;
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setConfirmPassword(""); // Reset confirm password on new input

    // Validate password length
    if (value.length == 0 || value.length > 6) {
      setPasswordError(false);
      setPasswordErrorMessage("");
    } else {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Check if confirm password matches
    if (value.length === 0 || value === password) {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    } else {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match");
    }
  };

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

  const handleOnSingupClick = () => {
    if (username.length === 0) {
      setUsernameError("Username is required");
      return;
    } else {
      setUsernameError("");
    }

    if (email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      setEmailTouched(true);
      return;
    } else {
      setEmailError(false);
      setEmailTouched(true);
    }

    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long");
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    // Reset form fields
    setUsername("");
    setUsernameError("");
    setPassword("");
    setPasswordError(false);
    setPasswordErrorMessage("");
    setConfirmPassword("");
    setConfirmPasswordError(false);
    setConfirmPasswordErrorMessage("");
    setEmail("");
    setEmailError(false);
    setEmailTouched(false);
    
    dispatch(showAlertWithTimeout({
      message: "Signup successful! Please log in.",
      type: "success",
      isVisible: true
    }));

    togglePage(true); // Switch to login page after signup
  };
  
  return (
    <SignupStyledDiv>
      <div className="signup-head">
        <h1>Create an account</h1>
        <p>
          Already have an account?
          <Button size="small" onClick={() => togglePage(true)}>
            log in
          </Button>
        </p>
      </div>

      <div className="signup-form">
        <TextField
          className="signup-field"
          label="Username"
          size="small"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError.length > 0}
          helperText={usernameError.length > 0 ? usernameError : ""}
        />
        <TextField
          className="signup-field"
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
          className="signup-field"
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
        <TextField
          className="signup-field"
          label="Confirm Password"
          size="small"
          fullWidth
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError}
          helperText={confirmPasswordError ? confirmPasswordErrorMessage : ""}
        />

        <Button
          fullWidth
          variant="contained"
          className="signup-btn"
          sx={{
            marginTop: "2rem",
            backgroundColor: bgColors.loginBtnColor,
            "&:hover": { backgroundColor: bgColors.loginBtnFocusColor },
          }}
          onClick={handleOnSingupClick}
        >
          SIGN UP
        </Button>
      </div>
    </SignupStyledDiv>
  );
};

export default Signup;
