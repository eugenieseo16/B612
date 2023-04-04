import GETH from '../../assets/imgs/goerli-eth.png';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from 'store/userAtom';
import { MetaData, PlanetDetail, PlanetInfo } from './PlanetCard.styles';
import { Button } from '@mui/material';
import { useFlowerContract } from '@components/contracts/roseToken';
import boxAnimateAtom from 'store/store/boxAnimateAtom';
import { useEffect } from 'react';

function FlowerCard() {
  const flowerContract = useFlowerContract();
  const me = useRecoilValue(userAtom);
  const [boxAnimate, setBoxAnimate] = useRecoilState(boxAnimateAtom);

  // const mintingFlower = () => {
  //   planetContract?.methods.purchasePlanetToken(planet?.planetTokenId).send({
  //     from: me?.memberAddress,
  //     value: planet.planetPrice,
  //   });
  // };
  const mintingFlower = () => {
    if (boxAnimate) return;
    flowerContract?.methods.mintRoseToken().send({ from: me?.memberAddress });
    setBoxAnimate(true);
  };

  useEffect(() => {
    setBoxAnimate(false);
  }, []);

  return (
    <>
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
          <Button
            disabled={boxAnimate}
            variant="contained"
            color="success"
            onClick={mintingFlower}
          >
            <span style={{ color: '#fff' }}>즉시구매</span>
          </Button>
        </MetaData>
      </PlanetDetail>
    </>
  );
}

export default FlowerCard;
