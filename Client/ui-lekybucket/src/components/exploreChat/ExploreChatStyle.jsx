import styled from "styled-components";
import { bgColors, textColors } from "../../assets/colors";

export const ExploreChatStyleDiv = styled.div`
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

  .group-items {
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .group-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: 0.2s;
      cursor: pointer;

      padding: 0.3rem;
      border-radius: 8px;
      width: 100%;

      .group-icon {
      }

      .user-icon {
        background-color: ${bgColors.exploreGrpBgColor};
        border-radius: 50%;
        padding: 0.2rem 0.4rem;
        color: ${textColors.profileIconTextColor};
        transition: 0.2s;
      }

    }

    .group-item:hover { 
      background-color: ${bgColors.exploreGrpBgColor};
      color: ${textColors.profileIconTextColor};

      .user-icon  {
        background-color: ${textColors.profileIconTextColor};
        color: ${bgColors.profileIconBgColor};
      }
    }
  }
`;
