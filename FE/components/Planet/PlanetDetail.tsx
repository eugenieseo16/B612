import React from 'react';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PlanetDetail } from './PlanetDetailEmotion';

import Goerli from '../../assets/imgs/goerli-eth.png';

import { usePlanetContract } from '@components/contracts/planetToken';
// import { getPlanetDetailAPI } from 'API/planetAPIs';

function PlanetDetailCard() {
  const user = useRecoilValue(userAtom);

  const router = useRouter();
  const planetId = router.query;

  const planetContract = usePlanetContract();
  async function getPlanetDetail() {
    const planetDetail = await planetContract?.methods
      .b612AddressMap('3')
      .call();
    return planetDetail;
  }
  // const planetDetail = await getPlanetDetail();
  // console.log(planetDetail);

  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-info">
          <div>
            <p>진실된 뱀파이어처럼</p>
            <h2>부지런한 하나별</h2>
          </div>
          <div className="planet-price">
            <img src={Goerli.src} alt="Goerli Ethereum" id="goerli-ethereum" />

            <span>333</span>
            <span>GoerliETH</span>
          </div>
        </div>

        <div className="planet-date">
          <p>등록 날짜: 2022-03-31</p>
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
