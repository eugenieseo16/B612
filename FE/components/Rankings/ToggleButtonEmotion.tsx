import styled from '@emotion/styled';

export const RankingModal = styled.div`
  // width: 100vh;
  // height: 100vh;
`;
export const ButtonContainer = styled.div`
  background-color: #bd95f4;
  border-radius: 50px;
  margin-top: 20px;
  margin-bottom: 20px;

  height: 5rem;
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

export const RankingDataContainer = styled.div`
  width: 80%;
  padding-top: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
