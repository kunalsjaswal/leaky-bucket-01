import styled from 'styled-components';
import bgImage from '../../assets/images/bg-cover.jpg';

export const DashboardStyledDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30% 70%;

  .chat-container {
    width: 100%;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.25), 
        rgba(255, 255, 255, 0.25)
      ),
      url(${bgImage});
    background-size: cover;
    background-position: center;
  }
`