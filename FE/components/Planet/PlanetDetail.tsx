import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PlanetDetail } from './PlanetDetailEmotion';

import dayjs from 'dayjs';
import Goerli from '../../assets/imgs/goerli-eth.png';

import { usePlanetContract } from '@components/contracts/planetToken';
import { planetNameParser } from 'utils/planetUtil';

function PlanetDetailCard() {
  const user = useRecoilValue(userAtom);

  const router = useRouter();
  const planetId = router.query?.planetId;
  const planetContract = usePlanetContract();
  const [planetName, setPlanetName] = useState(null);
  const [planetPrice, setPlanetPrice] = useState(null);
  const [planetCreatedAt, setPlanetCreatedAt] = useState(null);
  const [planetDetail, setPlanetDetail] = useState(null);

  useEffect(() => {
    if (!planetId) return;
    planetContract?.methods
      .b612AddressMap(planetId)
      .call()
      .then((data: any) => {
        setPlanetDetail(data);
        setPlanetPrice(data?.planetPrice);
        setPlanetName(data?.planetName);
        setPlanetCreatedAt(data?.createdAt);
      });
  }, [planetContract, planetId]);

  console.log(planetDetail);
  const [adj, title] = planetNameParser(planetName || '');

  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-info">
          <div>
            <p>{adj}</p>
            <h2>{title}</h2>
          </div>
          <div className="planet-price">
            <img src={Goerli.src} alt="Goerli Ethereum" id="goerli-ethereum" />

            <span>{planetPrice ? planetPrice * 10 ** -18 : 0} GETH</span>
          </div>
        </div>

        <div className="planet-date">
          <p>
            등록 날짜:{' '}
            {planetCreatedAt
              ? dayjs(planetCreatedAt * 1000).format('YYYY-MM-DD')
              : '0000-00-00'}
          </p>
        </div>

        <div className="planet-owner">
          <div className="member-info">
            <img src={user?.memberImage} alt="" />
            <h6>{user?.memberNickname}</h6>
            <span></span>
          </div>
        </div>
      </div>
    </PlanetDetail>
  );
}

export default PlanetDetailCard;
