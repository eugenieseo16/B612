import React from 'react';

import { PlanetDetail } from './PlanetDetailEmotion';

function PlanetDetailCard() {
  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-info">
          <h2>행성이름</h2>
          <div className="planet-price">
            <p>320 SSF</p>
            <button>구매 요청하기</button>
          </div>
        </div>
        <p>등록 날짜: 2022-03-31</p>

        <div className="member-info">
          <img
            src="https://i.pinimg.com/236x/df/3c/4d/df3c4dcf15935d0111426bb28b12d9b1.jpg"
            alt=""
          />
          <h6>사용자 이름</h6>
          <span>계급</span>
        </div>
      </div>
    </PlanetDetail>
  );
}

export default PlanetDetailCard;
