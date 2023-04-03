import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StarsIcon from '@mui/icons-material/Stars';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HomeIcon from '@mui/icons-material/Home';
import { useRecoilState } from 'recoil';
import userAtom from 'store/userAtom';
import { useRouter } from 'next/router';
import axios from 'axios';
import { myWeb3, usePlanetContract } from '@components/contracts/planetToken';

export default function MobileNav() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const planetContract = usePlanetContract();

  const [me, setMe] = useRecoilState(userAtom);
  const router = useRouter();
  const handleAuth = () => {
    if (me?.memberId) {
      router.push(`/profile/${me.memberId}`);
      return;
    }
    setOpen(true);
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post('https://j8a208.p.ssafy.io/api/member', {
      memberAddress: address,
    });
    const planetContractAddress = '0xeab8b1e0cd0de0c9e07928d8d8c9aab166ae983e';
    let isApproved = false;

    isApproved = await planetContract?.methods
      .isApprovedForAll(address, planetContractAddress)
      .call();
    let planets = [];
    planets = await planetContract?.methods.getPlanetTokens(address).call();

    const eth = (
      parseInt(await myWeb3().eth.getBalance(address), 16) *
      10 ** -18
    ).toFixed(4);

    setMe({ ...data.responseData, planets, isApproved, eth: +eth });
  };

  return (
    <>
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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <form onSubmit={handleLogin}>
          <TextField
            helperText="Please enter your Wallet Address"
            id="demo-helper-text-misaligned"
            label="Wallet Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <button>submit</button>
        </form>
      </Modal>
    </>
  );
}
