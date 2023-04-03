import GETH from '../../assets/imgs/goerli-eth.png';
import { useRecoilValue } from 'recoil';
import storeIndexAtom from 'store/store/storeIndexAtom';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import { planetNameParser } from 'utils/planetUtil';
import dayjs from 'dayjs';
import { usePlanetContract } from '@components/contracts/planetToken';
import userAtom from 'store/userAtom';
import { useMobile } from '@hooks/useMobile';
import { PlanetDetail } from './PlanetCard.styles';

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
    <PlanetDetail >
      <div className="planet-info">
        <div>
          <p>{adj}</p>
          <h2>{title}</h2>
        </div>
        <div className="planet-price">
          <img src={GETH.src} alt="GETH" />
          <p>{+planet?.planetPrice * 10 ** -18} GETH</p>
        </div>
      </div>

      <div className="meta-data">
        <p>
          등록 날짜: {dayjs(+planet?.createdAt * 1000).format('YYYY-MM-DD')}
        </p>

        {me?.memberAddress.toLocaleUpperCase() !=
        planet?.userAddress.toLocaleUpperCase() ? (
          <button onClick={purchasePlanet}>즉시구매</button>
        ) : (
          <button onClick={discardForSale}>판매 취소</button>
        )}
      </div>
    </PlanetDetail>
  );
}

export default PlanetCard;
