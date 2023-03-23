import React from 'react';

import { PlanetDetail } from './PlanetDetailEmotion';

import SSF from '../../assets/imgs/ssf.png';

function PlanetDetailCard() {
  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-info">
          <div>
            <p>진실된 뱀파이어처럼</p>
            <h2>부지런한 하나별</h2>
          </div>
          <div className="planet-price">
            <img src={SSF.src} alt="SSAFY coin" id="ssafy-coin" />
            <p>320 SSF</p>
          </div>
        </div>

        <div className="planet-date">
          <p>등록 날짜: 2022-03-31</p>
        </div>

        <div className="planet-owner">
          <div className="member-info">
            <img
              src="https://i.pinimg.com/236x/df/3c/4d/df3c4dcf15935d0111426bb28b12d9b1.jpg"
              alt=""
            />
            <h6>사용자 이름 #7</h6>
            <span></span>
          </div>

          <div>
            <button>구매 요청하기</button>
          </div>
        </div>
      </div>
    </PlanetDetail>
  );
}

export default PlanetDetailCard;
