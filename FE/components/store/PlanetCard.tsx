import GETH from '../../assets/imgs/goerli-eth.png';
import { useRecoilValue } from 'recoil';
import storeIndexAtom from 'store/store/storeIndexAtom';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import { planetNameParser } from 'utils/planetUtil';
import dayjs from 'dayjs';
import { usePlanetContract } from '@components/contracts/planetToken';
import userAtom from 'store/userAtom';
import { useMobile } from '@hooks/useMobile';
import { MetaData, PlanetDetail, PlanetInfo } from './PlanetCard.styles';
import { Button } from '@mui/material';

function PlanetCard() {
  const planetContract = usePlanetContract();
  const { index, page } = useRecoilValue(storeIndexAtom);
  const planets = useRecoilValue(onSalePlanetsAtom);
  const planet = planets[index + page * 5];
  const [adj, title] = planetNameParser(planet?.planetName);
  const me = useRecoilValue(userAtom);
  const isMobile = useMobile();

  const purchasePlanet = () => {
    planetContract?.methods.purchasePlanetToken(planet?.planetTokenId).send({
      from: me?.memberAddress,
      value: planet.planetPrice,
    });
  };
  const discardForSale = () => {
    planetContract?.methods
      .discardForSalePlanetToken(planet?.planetTokenId)
      .send({ from: me?.memberAddress });
  };

  return (
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

        {me?.memberAddress.toLocaleUpperCase() !=
        planet?.userAddress.toLocaleUpperCase() ? (
          <Button variant="contained" color="success" onClick={purchasePlanet}>
            <span style={{ color: '#fff' }}>즉시구매</span>
          </Button>
        ) : (
          <Button variant="contained" color="error" onClick={discardForSale}>
            <span style={{ color: '#fff' }}>판매취소</span>
          </Button>
        )}
      </MetaData>
    </PlanetDetail>
  );
}

export default PlanetCard;
