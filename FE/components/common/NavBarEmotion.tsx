import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${rgba('#Fee4be', 0.4)};
  justify-content: space-between;
  padding: 0rem 2rem;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;

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
      margin-left: 1rem;
      display: flex;
      #icon-item {
        color: #394666;
        margin-left: 20px;
      }
      #profile-image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 20px;
      }
    }
  }
`;

export const NotificationBar = styled.div`
  margin-top: 5rem;
  width: 400px;

  .notification-item {
    display: flex;
    flex-direction: column;
    h4 {
      padding: 1rem 0rem;
    }
    p {
      padding-bottom: 1rem;
    }
  }
`;
