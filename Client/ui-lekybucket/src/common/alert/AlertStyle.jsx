import styled from "styled-components";

export const AlertStyleDiv = styled.div`
    position: absolute;
    width: 35%;
    height: 20%;
    z-index: 10;
    margin-left: 35%;
    text-align: center;

    animation: fadeIn 0.5s ease-in-out;
    animation-fill-mode: forwards;
    @keyframes fadeIn {
        from {
            margin-top: -1rem;
        }
        to {
            margin-top: 1rem;
        }
    }
`