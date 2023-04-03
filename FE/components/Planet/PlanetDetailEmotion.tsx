import styled from '@emotion/styled';

export const PlanetDetail = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 99;

  background: rgba(174, 197, 255, 0.7);
  box-shadow: 0px 0px 15px 7px #aec5ff;

  border-radius: 2rem;

  .planet-info {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 8px;
    div {
      p {
        margin-bottom: 4px;
      }
    }
    .planet-price {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        margin-right: 5px;
        border-radius: 50%;
      }
    }
  }
  .meta-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    button {
      height: 2rem;
      width: 8rem;

      font-size: 1.2rem;
      color: #252530;

      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.7);
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
    .meta-data {
      padding: 0.5rem;
      p {
        font-size: 0.8rem;
      }
      button {
        display: none;
      }
    }
  }
`;
