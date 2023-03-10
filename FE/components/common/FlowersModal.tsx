import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { colors } from 'styles/colors';
import { shadowGenerator } from 'styles/utils';
import FlowerThree from './FlowerThree';
import { rgba } from 'emotion-rgba';

// HTMLDivElement, HTMLMotionProps<'div'>;

function FlowersModal() {
  return (
    <Container>
      <Canvas style={{ width: '300px', height: '300px' }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[0, 5, 1]} />
        <FlowerThree type={1} />
      </Canvas>
      <Canvas style={{ width: '300px', height: '300px' }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[0, 5, 1]} />
        <FlowerThree type={2} />
      </Canvas>
    </Container>
  );
}

export default FlowersModal;

const Container = styled.div`
  background-color: ${rgba(colors.purple, 0.7)};
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: ${shadowGenerator(colors.purple)};
  display: grid;
  grid-template-columns: 50% 50%;
`;
