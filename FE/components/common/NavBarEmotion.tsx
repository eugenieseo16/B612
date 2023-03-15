import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #aec5ff;
  justify-content: space-between;
  padding: 2rem 2rem;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;

  #link-item {
    padding: 15px;
    color: white;
    text-decoration-line: none;
    text-decoration: none;
    .selected {
      color: #394666;
      opacity: 80%;
      /* text-decoration: underline; */
    }
    .default {
      color: #394666;
    }
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
      #icon-item {
        color: #394666;
        margin-left: 20px;
      }
    }
  }
`;
