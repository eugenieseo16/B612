import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Badge from '@mui/material/Badge';
import { Container } from '../common/NavBarEmotion';

function NavBar() {
  const router = useRouter();
  const pathname = router.asPath;

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
          <h2 className={pathname === '/' ? 'selected' : 'default'}>홈</h2>
        </Link>

        <Link href={`/rankings`} id="link-item">
          <h2 className={pathname === '/rankings' ? 'selected' : 'default'}>
            명예의 전당
          </h2>
        </Link>

        <Link href={`/store`} id="link-item">
          <h2 className={pathname === '/store' ? 'selected' : 'default'}>
            상점
          </h2>
        </Link>

        <div className="icon-container">
          <Badge badgeContent={4} color="error">
            <NotificationsNoneIcon sx={{ fontSize: '30px' }} id="icon-item" />
          </Badge>

          {/* 비회원일시 */}
          <AccountCircleIcon sx={{ fontSize: '30px' }} id="icon-item" />

          {/* 회원일시 */}
          {/* 회원 프로필 이미지 설정 */}
          {/* 경로도 /profile/로 연결해주기 */}
        </div>
      </div>
    </Container>
  );
}

export default NavBar;
