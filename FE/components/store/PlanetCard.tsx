import { PlanetDetail } from '../Planet/PlanetDetailEmotion';
import GETH from '../../assets/imgs/goerli-eth.png';
import { useRecoilValue } from 'recoil';
import storeIndexAtom from 'store/store/storeIndexAtom';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import { planetNameParser } from 'utils/planetUtil';
import dayjs from 'dayjs';
import { usePlanetContract } from '@components/contracts/planetToken';
import userAtom from 'store/userAtom';

function PlanetCard() {
  const planetContract = usePlanetContract();
  const { index, page } = useRecoilValue(storeIndexAtom);
  const planets = useRecoilValue(onSalePlanetsAtom);
  const planet = planets[index + page * 5];
  const [adj, title] = planetNameParser(planet?.planetName);
  const me = useRecoilValue(userAtom);

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
      <div className="detail-container">
        <div className="planet-info">
          <div>
            <p>{adj}</p>
            <h2>{title}</h2>
          </div>
          <div className="planet-price">
            <img src={GETH.src} alt="SSAFY coin" id="ssafy-coin" />
            <p>{+planet?.planetPrice * 10 ** -18} GETH</p>
          </div>
        </div>

        <div className="planet-date">
          <p>
            등록 날짜: {dayjs(+planet?.createdAt * 1000).format('YYYY-MM-DD')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {me?.memberAddress.toLocaleUpperCase() !=
          planet?.userAddress.toLocaleUpperCase() ? (
            <button onClick={purchasePlanet}>즉시구매</button>
          ) : (
            <button onClick={discardForSale}>판매 취소</button>
          )}
        </div>
      </div>
    </PlanetDetail>
  );
}

export default PlanetCard;
