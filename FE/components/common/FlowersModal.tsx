import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { colors } from 'styles/colors';
import { CenterBox, shadowGenerator } from 'styles/utils';
import FlowerThree from './FlowerThree';
import { rgba } from 'emotion-rgba';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useState } from 'react';

// HTMLDivElement, HTMLMotionProps<'div'>;
const MY_FLOWERS = [0, 1, 2, 1, 1, 1, 1];

function FlowersModal() {
  const [type, setType] = useState(0);
  return (
    <Container>
      <div style={{ overflowY: 'scroll', padding: '0 1rem 0 0' }}>
        {MY_FLOWERS.map((flowerType, i) => (
          <Card
            key={i}
            sx={{ cursor: 'pointer', marginBottom: '1rem' }}
            onClick={() => setType(flowerType)}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819__340.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <CenterBox>
        <Canvas
          camera={{
            position: [0, 5, 7],
          }}
          style={{
            width: '25vw',
            height: '25vw',
            background: '#888',
            borderRadius: '1rem',
          }}
        >
          <ambientLight intensity={0.2} />
          <spotLight position={[0, 5, 0]} />
          <FlowerThree type={type} />
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
  grid-template-columns: 50% 50%;
`;
