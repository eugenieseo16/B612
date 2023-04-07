import GETH from '../../assets/imgs/goerli-eth.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import storeIndexAtom from 'store/store/storeIndexAtom';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import { planetNameParser } from 'utils/planetUtil';
import dayjs from 'dayjs';
import { usePlanetContract } from '@components/contracts/planetToken';
import userAtom from 'store/userAtom';
import { MetaData, PlanetDetail, PlanetInfo } from './PlanetCard.styles';
import { Button } from '@mui/material';
import { LoginAlert } from './FlowerCard';
import { useState } from 'react';
import loadingAtom from 'store/loadingAtom';

function PlanetCard() {
  const planetContract = usePlanetContract();
  const { index, page } = useRecoilValue(storeIndexAtom);
  const planets = useRecoilValue(onSalePlanetsAtom);
  const planet = planets[index + page * 5];
  const [adj, title] = planetNameParser(planet?.planetName);
  const me = useRecoilValue(userAtom);
  const [open, setOpen] = useState(false);
  const [{ loading }, setLoading] = useRecoilState(loadingAtom);
  const purchasePlanet = async () => {
    console.log(planet);
    console.log(planetContract);
    if (loading) return;
    if (!me) {
      setOpen(true);
      return;
    }
    setLoading({ loading: true, type: 'purchase planet' });

    try {
      await planetContract?.methods
        .purchasePlanetToken(planet?.planetTokenId)
        .send({
          from: me?.memberAddress,
          value: planet.planetPrice,
        });
    } catch (error) {
      console.log('예러예러', error);
      setLoading({
        loading: false,
        type: 'purchase planet',
        message: '행성 구매를 실패했습니다',
      });

      return;
    }
    setLoading({
      loading: false,
      type: 'purchase planet',
      message: '행성을 구매했습니다',
    });
  };
  const discardForSale = async () => {
    if (loading) return;
    if (!me) {
      setOpen(true);
      return;
    }
    setLoading({ loading: true, type: 'discard planet' });

    try {
      await planetContract?.methods
        .discardForSalePlanetToken(planet?.planetTokenId)
        .send({ from: me?.memberAddress });
    } catch (error) {
      setLoading({
        loading: false,
        type: 'discard planet',
        message: '계약이 중단되었습니다',
      });
      return;
    }
    setLoading({
      loading: false,
      type: 'discard planet',
      message: '행성판매를 취소했습니다',
    });
  };

  return (
    <>
      <LoginAlert openState={[open, setOpen]} />

      <PlanetDetail>
        <PlanetInfo>
          <div>
            <p>{adj}</p>
            <h2>{title}</h2>
          </div>
          <div className="planet-price">
            <img src={GETH.src} alt="GETH" />
            <p>{+planet?.planetPrice * 10 ** -18} GETH</p>
          </div>
        </PlanetInfo>

        <MetaData>
          <p>
            등록 날짜: {dayjs(+planet?.createdAt * 1000).format('YYYY-MM-DD')}
          </p>

          {loading ? (
            <Button variant="contained" color="error" disabled>
              <span style={{ color: '#fff' }}>계약채결중</span>
            </Button>
          ) : me?.memberAddress.toLocaleUpperCase() !=
            planet?.userAddress.toLocaleUpperCase() ? (
            <Button
              variant="contained"
              color="success"
              onClick={purchasePlanet}
            >
              <span style={{ color: '#fff' }}>즉시구매</span>
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={discardForSale}>
              <span style={{ color: '#fff' }}>판매취소</span>
            </Button>
          )}
        </MetaData>
      </PlanetDetail>
    </>
  );
}

export default PlanetCard;
