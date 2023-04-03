import styled from '@emotion/styled';

export const Container = styled.div`
  // background-color: pink;

  // background-color: yellow;
  // border: solid 4px white;
  // border-radius: 5rem;
  .planet-item,
  .member-item {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      margin-left: 3rem;
    }
    h6 {
    }
  }

  .like-item {
    display: flex;
    align-items: center;
    justify-content: center;
    #icon-item {
      color: #fb6f92;
      margin-right: 1rem;
    }
  }

  #link-item {
    text-decoration: none;
  }
`;
