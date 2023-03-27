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

// HTMLDivElement, HTMLMotionProps<'div'>;
// const MY_FLOWERS = [0, 1, 2, 1, 1, 1, 1];
const MY_FLOWERS_MAP = [
  { type: 0, count: 1 },
  { type: 1, count: 4 },
  { type: 2, count: 1 },
];
const FLOWER_IMG = [marioFlower, glowFlower, dinosour];

function FlowersModal({ user }: { user: IUser | null }) {
  const [selectedType, setSelectedType] = useState(-1);
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
        {MY_FLOWERS_MAP.map(({ type, count }, i) => (
          <motion.div
            animate={{
              boxShadow: type === selectedType ? simpleShadow : 'none',
              opacity: type === selectedType ? '1' : '0.6',
            }}
            onClick={() => setSelectedType(type)}
            key={i}
          >
            <FlowerImgContainer>
              <img src={FLOWER_IMG[type].src} alt="" />
              <div>
                <h6>꽃 종류 입니다아아아 #{type}</h6>
                <p>소유갯수 : {count}</p>
                <div>
                  <Button>팔기</Button>
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
          <Suspense fallback={null}>
            <FlowerThree type={selectedType} />
          </Suspense>
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
