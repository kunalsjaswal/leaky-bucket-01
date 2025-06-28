import styled from 'styled-components';
import { bgColors, textColors } from '../../assets/colors';

export const NavbarStyledDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  
  .profile-view {
    width: 100%;
    display: grid;
    grid-template-columns: 5fr 1fr;
    align-items: center;
    padding-bottom: 1.5rem;
    
    .profile-icon {      
        display: flex;
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
        align-items: center;
        justify-content: center;
        background: ${bgColors.profileIconBgColor};
        color: ${textColors.profileIconTextColor};
        cursor: default;
    }
  }

  .explore-view {
    padding: 1rem 0 0 0 ;
  }

  .content-scroll {
    position: absolute;
    width: 95%;
    height: 85%;
    overflow-y: auto;

    hr {
      width: 95%
    }
  }

  // custom scroll bar
   /* width */
  ::-webkit-scrollbar {
    width: 2px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }
`