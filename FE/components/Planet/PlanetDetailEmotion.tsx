import styled from '@emotion/styled';

export const PlanetDetail = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 99;

  background: rgba(174, 197, 255, 0.7);
  box-shadow: 0px 0px 15px 7px #aec5ff;

  border-radius: 2rem;
  .detail-container {
    padding: 1rem;

    .planet-info {
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
    .planet-owner {
      display: flex;
      align-items: center;
      padding-top: 1rem;
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-right: 1rem;
      }
      #member-tier-icon {
        width: 20px;
        height: 20px;
        margin-left: 10px;
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

    button {
      height: 2rem;
      width: 8rem;

      font-size: 1.2rem;
      color: #252530;

      border: none;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.7);
    }

    #goerli-ethereum {
      width: 30px;
      margin-right: 5px;
    }
  }
`;
