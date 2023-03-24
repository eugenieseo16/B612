import styled from '@emotion/styled';

export const PlanetDetail = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 3rem;
  z-index: 99;

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

    .planet-date {
      padding-top: 10px;
      padding-bottom: 20px;
    }

    .planet-owner {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    button {
      height: 2rem;
      width: 8rem;

      font-size: 1.2rem;
      color: #252530;

      border: none;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.7);
    }

    #ssafy-coin {
      width: 30px;
      margin-right: 5px;
    }
  }
`;
