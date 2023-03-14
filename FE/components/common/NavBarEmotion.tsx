import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #aec5ff;
  height: 70px;
  justify-content: space-between;
  padding: 0rem 2rem;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  #link-item {
    padding: 15px;
    color: white;
    text-decoration-line: none;
    text-decoration: none;
  }

  .logo-container {
    display: flex;
    align-items: center;

    #logo-image {
      width: 50px;
      height: 50px;
      aspect-ratio: 1;
      border-radius: 50%;
    }
  }

  .menu-container {
    display: flex;
    align-items: center;

    .icon-container {
      margin-left: 15px;
      display: flex;
      color: #394666;
      #icon-item {
        margin-left: 15px;
      }
    }
  }
`;
