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
import { useMyInventory } from 'API/flowerAPIs';
import { FLOWERS_NAMES } from 'utils/flowerDataList';

// HTMLDivElement, HTMLMotionProps<'div'>;
// const MY_FLOWERS = [0, 1, 2, 1, 1, 1, 1];

const FLOWER_IMG = [marioFlower, glowFlower, dinosour];

function FlowersModal({ user }: { user: IUser | null }) {
  const inventory = useMyInventory(user?.memberId);
  const [selected, setSelected] = useRecoilState(selectedFlowerAtom);
  const setGardenIndex = useSetRecoilState(gardenIndexAtom);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  console.log(inventory);

  return (
    <Container
      style={{
        gridTemplateColumns: inventory?.length > 0 ? '35% 65%' : '100%',
      }}
    >
      <Button
        color="error"
        variant="contained"
        style={{ position: 'absolute', zIndex: 999 }}
        onClick={() => {
          setGardenIndex(-1);
          setSelected(null);
        }}
      >
        <span style={{ color: '#fff' }}>닫기</span>
      </Button>

      {inventory?.length <= 0 ? (
        <h1 style={{ alignSelf: 'center', textAlign: 'center' }}>
          심을 수 있는 꽃이 없습니다
        </h1>
      ) : (
        <>
          <div
            style={{
              overflowY: 'scroll',
              padding: '3rem 1rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {inventory?.map((flower: IFlower) => (
              <motion.div
                animate={{
                  boxShadow: simpleShadow,
                  opacity:
                    flower.flowerNftId === selected?.flowerNftId ? '1' : '0.6',
                }}
                onClick={() => setSelected(flower)}
                key={flower.flowerNftId}
              >
                <FlowerImgContainer>
                  <img src={FLOWER_IMG[1].src} alt="" />
                  <div>
                    <h6>#{FLOWERS_NAMES[flower.flowerType % 12]}</h6>
                    <div>
                      <Button
                        onClick={() => setGardenIndex(-1)}
                        variant="contained"
                        color="success"
                        disabled={flower.flowerNftId !== selected?.flowerNftId}
                      >
                        <span style={{ color: '#fff' }}>심기</span>
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
        </>
      )}
    </Container>
  );
}

export default FlowersModal;

const Container = styled.div`
  padding: 1rem;
  background-color: ${rgba(colors.purple, 0.7)};
  width: 80%;
  height: 80%;
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
