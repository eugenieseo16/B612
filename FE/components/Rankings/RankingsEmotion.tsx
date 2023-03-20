import styled from '@emotion/styled';

export const RankingTable = styled.table`
  width: 100%;

  .rank {
    width: 10%;
  }

  .planet {
    width: 40%;
  }

  .member {
    width: 30%;
  }

  .member-name {
    width: 40%;
  }

  .class {
    width: 30%;
  }

  .likes {
    width: 10%;
  }
`;

export const TableItem = styled.tr`
  height: 5rem;

  vertical-align: middle;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .rank {
    text-align: center;
  }

  .planet {
    margin-left: 30px;
    width: 95%;

    display: flex;
    align-items: center;
    h6 {
      padding-left: 10px;
    }
  }

  .member {
    text-align: center;
  }

  .class {
    text-align: center;
  }

  .member-info {
    margin-left: 30px;
    display: flex;
    align-items: center;
    p {
      padding-left: 10px;
    }
  }

  .likes {
    display: flex;
    align-items: center;
    #icon-item {
      color: #fb6f92;
    }
  }
`;
