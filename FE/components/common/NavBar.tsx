import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Container } from '../common/NavBarEmotion';

function NavBar() {
  return (
    <Container>
      <div className="logo-container">
        <img
          src="https://img.insight.co.kr/static/2018/10/19/700/so0f5n598kaaxs9gmz86.jpg"
          alt=""
          id="logo-image"
        />
        <Link href={`/`} id="link-item">
          <h5>머무르다</h5>
        </Link>
      </div>

      <div className="menu-container">
        <Link href={`/`} id="link-item">
          <h2>홈</h2>
        </Link>

        <Link href={`/ranking`} id="link-item">
          <h2>명예의 전당</h2>
        </Link>

        <Link href={`/store`} id="link-item">
          <h2>상점</h2>
        </Link>

        <div className="icon-container">
          <NotificationsNoneIcon sx={{ fontSize: '30px' }} id="icon-item" />
          <AccountCircleIcon sx={{ fontSize: '30px' }} id="icon-item" />
        </div>
      </div>
    </Container>
  );
}

export default NavBar;
