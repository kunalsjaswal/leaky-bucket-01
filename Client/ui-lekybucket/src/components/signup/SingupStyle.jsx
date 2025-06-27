import styled from "styled-components";
import { bgColors } from "../../assets/colors";

export const SignupStyledDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: ${bgColors.loginPanelLightColor};
  text-align: center;
  padding: 2rem;

  .signup-head h1 {
      font-weight: 600;
  }

  .signup-form {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    justify-content: center;
    align-items: center;
    margin: 5rem auto;
  }
`