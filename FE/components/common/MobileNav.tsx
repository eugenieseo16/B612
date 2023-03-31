import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StarsIcon from '@mui/icons-material/Stars';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HomeIcon from '@mui/icons-material/Home';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { useRouter } from 'next/router';
import { handleMetamaskLogin } from '@components/MetaMaskLogin';

export default function MobileNav() {
  const [value, setValue] = React.useState(0);
  const me = useRecoilValue(userAtom);
  const router = useRouter();
  const handleAuth = () => {
    if (me?.memberId) {
      router.push(`/profile/${me.memberId}`);
      return;
    }
    if (window.ethereum) {
      handleMetamaskLogin();
      return;
    }

    window.open('https://metamask.app.link/dapp/b612.shop');
  };
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => router.push('/')}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => router.push('/')}
          icon={<StarsIcon />}
        />
        <BottomNavigationAction
          onClick={() => router.push('/store')}
          icon={<LocalGroceryStoreIcon />}
        />
        <BottomNavigationAction
          onClick={handleAuth}
          icon={
            <Avatar
              src={me?.memberImage ? me?.memberImage : ''}
              sx={{ width: '24px', height: '24px' }}
            />
          }
        />
      </BottomNavigation>
    </Paper>
  );
}
