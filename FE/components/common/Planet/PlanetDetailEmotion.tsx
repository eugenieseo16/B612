import styled from '@emotion/styled';

export const PlanetDetail = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 3rem;

  width: 30em;
  height: 12rem;
  background: rgba(174, 197, 255, 0.7);
  box-shadow: 0px 0px 15px 7px #aec5ff;

  border-radius: 2rem;
  .detail-container {
    padding: 1.5rem;
    .planet-info {
      display: flex;
      justify-content: space-between;
      .planet-price {
        display: flex;
        align-items: center;
      }
    }
    .member-info {
      display: flex;
      align-items: center;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
  }
`;
