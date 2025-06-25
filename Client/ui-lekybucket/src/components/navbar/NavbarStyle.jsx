import styled from 'styled-components';
import { bgColors, textColors } from '../../assets/colors';

export const NavbarStyledDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0.5rem;
  
  .profile-view {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr 2fr;
    align-items: end;
    padding-bottom: 1rem;
    border-bottom: 1px solid gray;
    
    .profile-icon {      
      h3 {
        display: flex;
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
        align-items: center;
        justify-content: center;
        background: ${bgColors.profileIconBgColor};
        color: ${textColors.profileIconTextColor};
      }
    }

    .profile-info {
      line-height: 1.3rem;
    }
    
  }

`