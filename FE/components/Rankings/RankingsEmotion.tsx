import styled from '@emotion/styled';

export const RankingContainer = styled.div`
  background-color: white;
  border-radius: 30px;
  margin-top: 10px;
  margin-bottom: 10px;

  padding: 0rem 3rem;
  width: 100vh;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .rank {
    padding: 1rem 0rem;
  }

  .planet {
  }

  .member-info {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    p {
      padding: 0px 10px;
    }
  }

  .class {
  }

  .likes {
    display: flex;
  }
`;
