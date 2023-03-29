import { PlanetDetail } from '../Planet/PlanetDetailEmotion';
import SSF from '../../assets/imgs/ssf.png';
import { useRecoilValue } from 'recoil';
import storeIndexAtom from 'store/store/storeIndexAtom';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import { planetNameParser } from 'utils/planetUtil';
import dayjs from 'dayjs';
import { usePlanetContract } from '@components/contracts/planetToken';
import userAtom from 'store/userAtom';

function PlanetCard() {
  const planetContract = usePlanetContract();
  const { index } = useRecoilValue(storeIndexAtom);
  const planets = useRecoilValue(onSalePlanetsAtom);
  const planet = planets[index];
  const [adj, title] = planetNameParser(planet?.planetName);
  const me = useRecoilValue(userAtom);

  const purchasePlanet = () => {
    planetContract?.methods.purchasePlanetToken(planet?.planetTokenId).send({
      from: me?.memberAddress,
      value: planet.planetPrice,
      // gasPrice: '2500000000',
    });
    console.log(planet.planetTokenId);
  };

  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-info">
          <div>
            <p>{adj}</p>
            <h2>{title}</h2>
          </div>
          <div className="planet-price">
            <img src={SSF.src} alt="SSAFY coin" id="ssafy-coin" />
            <p>{+planet?.planetPrice * 10 ** -18} SSF</p>
          </div>
        </div>

        <div className="planet-date">
          <p>
            등록 날짜: {dayjs(+planet?.createdAt * 1000).format('YYYY-MM-DD')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button onClick={purchasePlanet}>즉시구매</button>
        </div>
      </div>
    </PlanetDetail>
  );
}

export default PlanetCard;
