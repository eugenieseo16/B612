import { Center, Html, useGLTF } from '@react-three/drei';
import { FLOWERS_LIST, FLOWERS_NAMES } from 'utils/flowerDataList';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Box3, Vector3 } from 'three';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import plantedFlowersAtom from 'store/garden/plantedFlowersAtom';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { simpleShadow } from 'styles/utils';
import { rgba } from 'emotion-rgba';
import { colors } from 'styles/colors';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { apiBaseUrl } from 'API/apiURLs';
import userAtom from 'store/userAtom';

function Flowers({ isMe }: { isMe: boolean }) {
  const [hover, setHover] = useState(-1);
  const flowersList = useRecoilValue(plantedFlowersAtom);
  return (
    <>
      {flowersList?.map((data: IFlower) => (
        <Flower
          key={data.flowerNftId}
          data={data}
          hoverState={[hover, setHover]}
          isMe={isMe}
        />
      ))}
    </>
  );
}

export default Flowers;

function Flower({
  data,
  hoverState,
  isMe,
}: {
  data: IFlower;
  hoverState: [number, Function];
  isMe: boolean;
}) {
  const [flowersList, setFlowerList] = useRecoilState(plantedFlowersAtom);

  const [hover, setHover] = hoverState;
  const { scene } = useGLTF(FLOWERS_LIST[+data.flowerType % 12]);
  const clone = SkeletonUtils.clone(scene);
  useEffect(() => {
    clone.traverse(node => (node.castShadow = true));
  }, [clone]);

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(clone);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  clone.scale.multiplyScalar(5 / maxAxis);
  bbox.setFromObject(clone);
  bbox.getCenter(center);
  bbox.getSize(size);
  clone.position.copy(center).multiplyScalar(-1);
  // clone.position.y += size.y * 0.5;

  const handleDig = () => {
    axios.delete(`${apiBaseUrl}/flower/${hover}`);
    const newFlowerList = flowersList.filter(
      flower => +flower.flowerNftId !== hover
    );
    setFlowerList(newFlowerList);
  };

  return (
    // <group position={[(index % 3) * 5 - 4, 0.6, Math.floor(index / 3) * 5 - 5]}>
    <group
      onClick={() => {
        if (hover === +data.flowerNftId) {
          setHover(-1);
        } else setHover(data.flowerNftId);
      }}
      position={[
        data.flowerLocationX,
        data.flowerLocationY,
        data.flowerLocationZ,
      ]}
    >
      <Center top>
        <primitive object={clone} />
        {isMe && (
          <Html position={[1, 0, 0]}>
            <motion.div
              animate={{
                opacity: hover === +data.flowerNftId ? 1 : 0,
                display: hover === +data.flowerNftId ? 'flex' : 'none',
              }}
              style={{
                padding: '1rem',
                width: '20rem',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '1rem',
                boxShadow: simpleShadow,
                background: rgba(colors.purple, 0.7),
                gap: '1rem',
              }}
            >
              <ClearIcon
                fontSize="large"
                onClick={() => setHover(-1)}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  color: '#d32f2f',
                  cursor: 'pointer',
                }}
              />
              <h3>{FLOWERS_NAMES[data.flowerType % 12]}</h3>
              <Button onClick={handleDig} variant="contained" color="error">
                <p style={{ color: '#fff' }}>파버리기</p>
              </Button>
            </motion.div>
          </Html>
        )}
      </Center>
    </group>
  );
}
