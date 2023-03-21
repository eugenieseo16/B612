import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userAtom from 'store/userAtom';
import { useRecoilValue } from 'recoil';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MetaMaskLogin from '@components/MetaMaskLogin';

import Badge from '@mui/material/Badge';
import { Container } from '../common/NavBarEmotion';

function NavBar() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const pathname = router.asPath;

  console.log(user);

  return (
    <Container>
      <div className="logo-container">
        <img
          src="https://img.insight.co.kr/static/2018/10/19/700/so0f5n598kaaxs9gmz86.jpg"
          alt=""
          id="logo-image"
        />
        <Link href={`/`} id="link-item">
          <h2>머무르다</h2>
        </Link>
      </div>

      <div className="menu-container">
        <Link href={`/`} id="link-item">
          <h4 className={pathname === '/' ? 'selected' : 'default'}>홈</h4>
        </Link>

        <Link href={`/rankings`} id="link-item">
          <h4 className={pathname === '/rankings' ? 'selected' : 'default'}>
            명예의 전당
          </h4>
        </Link>

        <Link href={`/store`} id="link-item">
          <h4 className={pathname === '/store' ? 'selected' : 'default'}>
            상점
          </h4>
        </Link>

        {!Boolean(user) ? (
          <div className="icon-container">
            <MetaMaskLogin />
          </div>
        ) : (
          <div className="icon-container">
            <Badge badgeContent={4} color="error">
              <NotificationsNoneIcon sx={{ fontSize: '30px' }} id="icon-item" />
            </Badge>
            <Link href={`/profile`}>
              <AccountCircleIcon sx={{ fontSize: '30px' }} id="icon-item" />
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

export default NavBar;
