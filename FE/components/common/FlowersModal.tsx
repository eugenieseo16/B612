/* eslint-disable */

import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { colors } from 'styles/colors';
import { CenterBox, shadowGenerator, simpleShadow } from 'styles/utils';
import FlowerThree from './FlowerThree';
import { rgba } from 'emotion-rgba';
import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import { dinosour, glowFlower, marioFlower } from 'assets/img/flowers/index';
import { Button } from '@mui/material';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import selectedFlowerAtom from 'store/garden/selectedFlowerAtom';
import gardenIndexAtom from 'store/garden/gardenIndexAtom';

// HTMLDivElement, HTMLMotionProps<'div'>;
// const MY_FLOWERS = [0, 1, 2, 1, 1, 1, 1];

const FAKE_FLOWERS: IFlower[] = [
  {
    createdAt: '',
    onSale: false,
    roseColor: '',
    roseTokenId: '21sda',
    roseType: 1,
    userAddress: '',
  },
  {
    createdAt: '',
    onSale: false,
    roseColor: '',
    roseTokenId: '123asasd',
    roseType: 2,
    userAddress: '',
  },
  {
    createdAt: '',
    onSale: false,
    roseColor: '',
    roseTokenId: '12ssdffhgs',
    roseType: 3,
    userAddress: '',
  },
];
const MY_FLOWERS_MAP = [
  { type: 0, count: 1 },
  { type: 1, count: 4 },
  { type: 2, count: 1 },
];
const FLOWER_IMG = [marioFlower, glowFlower, dinosour];

function FlowersModal({ user }: { user: IUser | null }) {
  const [selected, setSelected] = useRecoilState(selectedFlowerAtom);
  const setGardenIndex = useSetRecoilState(gardenIndexAtom);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <Container>
      <div
        style={{
          overflowY: 'scroll',
          padding: '0 1rem 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {FAKE_FLOWERS.map((flower: IFlower, i) => (
          <motion.div
            animate={{
              boxShadow: simpleShadow,
              opacity:
                flower.roseTokenId === selected?.roseTokenId ? '1' : '0.6',
            }}
            onClick={() => setSelected(flower)}
            key={i}
          >
            <FlowerImgContainer>
              <img src={FLOWER_IMG[1].src} alt="" />
              <div>
                <h6>꽃 종류 입니다아아아 #{flower.roseType}</h6>
                <div>
                  <Button
                    onClick={() => setGardenIndex(1)}
                    variant="contained"
                    disabled={flower.roseTokenId !== selected?.roseTokenId}
                  >
                    <span>심기</span>
                  </Button>
                </div>
              </div>
            </FlowerImgContainer>
          </motion.div>
        ))}
      </div>
      <CenterBox style={{ paddingLeft: '1rem' }}>
        <Canvas
          shadows
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '1rem',
          }}
        >
          <RecoilBridge>
            <FlowerThree />
          </RecoilBridge>
        </Canvas>
      </CenterBox>
    </Container>
  );
}

export default FlowersModal;

const Container = styled.div`
  padding: 1rem;
  background-color: ${rgba(colors.purple, 0.7)};
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: ${shadowGenerator(colors.purple)};
  border: 4px solid white;
  display: grid;
  grid-template-columns: 35% 65%;
`;
const FlowerImgContainer = styled.div`
  width: 100%;
  background-color: ${colors.blue};
  img {
    width: 100%;
  }
  div {
    padding: 1rem;
    h6 {
      font-size: 1.3rem;
      margin-bottom: 0.6rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;
