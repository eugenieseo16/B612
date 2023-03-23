import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userAtom from 'store/userAtom';
import { useRecoilValue } from 'recoil';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AppBar from '@mui/material/AppBar';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MetaMaskLogin from '@components/MetaMaskLogin';

import Badge from '@mui/material/Badge';
import { Container, NotificationBar } from '../common/NavBarEmotion';

type Anchor = 'right';

function NavBar() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const pathname = router.asPath;

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (
    <NotificationBar role="presentation" onClick={toggleDrawer('right', false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src="" alt="" />
            </ListItemIcon>
            <div className="notification-item">
              <h4>test</h4>
              <p>test</p>
            </div>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src="" alt="" />
            </ListItemIcon>
            <ListItemText primary={'text'} />
          </ListItemButton>
        </ListItem>
      </List>
    </NotificationBar>
  );
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
    >
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
              {/* notification */}
              <Badge badgeContent={4} color="error">
                <NotificationsNoneIcon
                  sx={{ fontSize: '30px' }}
                  id="icon-item"
                  onClick={toggleDrawer('right', !state.right)}
                />
              </Badge>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list}
              </Drawer>
              {/* profile */}
              <Link href={`/profile`}>
                <AccountCircleIcon sx={{ fontSize: '30px' }} id="icon-item" />
              </Link>
            </div>
          )}
        </div>
      </Container>
    </AppBar>
  );
}

export default NavBar;
