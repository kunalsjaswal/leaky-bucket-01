import styled from "styled-components";
import { bgColors, textColors } from "../../../assets/colors";

export const ChatNavbarStyle = styled.div`
  background: ${bgColors.chatNavbarBgColor};
  color: ${textColors.profileIconTextColor};
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  
  h3 {
    display: flex;
    align-items: center;
    gap: 1rem;

    .grp-icon {
      color: ${bgColors.chatNavbarBgColor};
      padding: 4px;
      border-radius: 50%;
      background-color: ${textColors.profileIconTextColor};
    }
  }
  
`