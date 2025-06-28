import styled from "styled-components";
import { bgColors } from "../../assets/colors";

export const LoadingStyleDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  background-color: ${bgColors.loadingBgColor};

  img {
    width: 20%;
  }
`