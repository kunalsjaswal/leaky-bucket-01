import styled from 'styled-components';
import bgImage from '../../assets/bg-cover-2.jpg';

export const AuthStyledDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 30% 70%;

  .bg-cover {
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    opacity: 1;
  }
`