import styled from "styled-components";
import { bgColors, textColors } from "../../assets/colors";

export const UserStatusStyleDiv = styled.div`
  header {
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .accordian {
    background-color: ${bgColors.loginPanelLightColor};
  }

  .MuiButtonBase-root, .MuiAccordionSummary-root.Mui-expanded{
    min-height: 50px;
  }

  .profile-icon {      
      display: flex;
      border-radius: 50%;
      height: 2.5rem;
      width: 2.5rem;
      align-items: center;
      justify-content: center;
      background: ${bgColors.profileIconBgColor};
      color: ${textColors.profileIconTextColor};
      cursor: default;
  }
  
`