import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PlanetDetail } from './PlanetDetailEmotion';

import Goerli from '../../assets/imgs/goerli-eth.png';

function PlanetDetailCard() {
  const user = useRecoilValue(userAtom);
  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-info">
          <div>
            <p>진실된 뱀파이어처럼</p>
            <h2>부지런한 하나별</h2>
          </div>
          <div className="planet-price">
            <img src={Goerli.src} alt="SSAFY coin" id="ssafy-coin" />

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
