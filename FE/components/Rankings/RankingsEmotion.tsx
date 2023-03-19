import styled from '@emotion/styled';

export const TableItem = styled.tr`
  // background-color: white;
  // border-radius: 30px;
  height: 5rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .planet {
    display: flex;
    align-items: center;
    h6 {
      padding-left: 10px;
    }
  }

  .member-info {
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
