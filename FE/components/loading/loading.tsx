// Loading.js
import React from 'react';
import { Background, LoadingText } from './style';
import LittlePrince from '../../assets/imgs/littlePrince.gif';

export default function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={LittlePrince.src} alt="로딩중" width="50%" />
    </Background>
  );
}
