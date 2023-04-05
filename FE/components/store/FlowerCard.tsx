import GETH from '../../assets/imgs/goerli-eth.png';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from 'store/userAtom';
import { MetaData, PlanetDetail, PlanetInfo } from './PlanetCard.styles';
import { Button } from '@mui/material';
import { useFlowerContract } from '@components/contracts/roseToken';
import boxAnimateAtom from 'store/store/boxAnimateAtom';
import { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import loadingAtom from 'store/loadingAtom';

function FlowerCard() {
  const flowerContract = useFlowerContract();
  const me = useRecoilValue(userAtom);
  const [boxAnimate, setBoxAnimate] = useRecoilState(boxAnimateAtom);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useRecoilState(loadingAtom);

  const mintingFlower = async () => {
    if (loading) return;
    if (!me) {
      setOpen(true);
      return;
    }
    setLoading(true);

    if (boxAnimate) return;
    try {
      await flowerContract?.methods
        .mintRoseToken()
        .send({ from: me?.memberAddress });
    } catch (e) {
      setLoading(false);
      return;
    }
    setBoxAnimate(true);
    setLoading(false);
  };

  useEffect(() => {
    setBoxAnimate(false);
  }, []);

  return (
    <>
      <LoginAlert openState={[open, setOpen]} />

      <PlanetDetail>
        <PlanetInfo>
          <div>
            <h2>랜덤 꽃 민팅</h2>
          </div>
          <div className="planet-price">
            <img src={GETH.src} alt="GETH" />
            <p>0.15 GETH</p>
          </div>
        </PlanetInfo>

        <MetaData>
          {loading ? (
            <Button disabled variant="contained">
              <span style={{ color: '#fff' }}>계약채결중</span>
            </Button>
          ) : (
            <Button
              disabled={boxAnimate}
              variant="contained"
              color="success"
              onClick={mintingFlower}
            >
              <span style={{ color: '#fff' }}>즉시구매</span>
            </Button>
          )}
        </MetaData>
      </PlanetDetail>
    </>
  );
}

export default FlowerCard;

export const LoginAlert = ({
  openState,
}: {
  openState: [boolean, Function];
}) => {
  const [open, setOpen] = openState;
  return (
    <Collapse
      in={open}
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: 99,
        width: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Alert
        variant="filled"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        로그인한 후에 이용 해 주세요🍭
      </Alert>
    </Collapse>
  );
};
