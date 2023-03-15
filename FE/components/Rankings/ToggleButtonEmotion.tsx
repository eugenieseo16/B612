import styled from '@emotion/styled';

export const ButtonContainer = styled.div`
  background-color: #bd95f4;
  border-radius: 50px;

  height: 50px;
  width: 21rem;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: none;
  }

  h4 {
    margin: 0;
  }

  .selected {
    color: pink;
    background-color: white;
    border-radius: 30px;
    height: 2.2rem;
    width: 10rem;
  }

  .default {
    background-color: transparent;
    width: 10rem;
  }
`;
