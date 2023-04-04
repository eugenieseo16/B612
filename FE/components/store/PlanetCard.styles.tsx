import styled from '@emotion/styled';

export const PlanetDetail = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 99;
  padding: 1rem;
  background: rgba(174, 197, 255, 0.7);
  box-shadow: 0px 0px 15px 7px #aec5ff;
  border-radius: 2rem;
  min-width: 25rem;

  .planet-price {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
  }

  @media (max-width: 500px) {
    bottom: 5rem;
    left: 5%;
    width: 90%;
    border-radius: 0.5rem;
    .planet-info {
      padding: 0.5rem;
      margin: 0;
      h2 {
        font-size: 1.2rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
`;

export const PlanetInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const MetaData = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    padding: 0.5rem;
    p {
      font-size: 0.8rem;
    }
    button {
      display: none;
    }
  }
`;
