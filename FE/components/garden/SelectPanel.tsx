import { Center, useGLTF } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import selectedFlowerAtom from 'store/garden/selectedFlowerAtom';
import { Box3, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { FLOWERS_LIST } from 'utils/flowerDataList';
import { colors } from 'styles/colors';
import plantButtonAtom from 'store/garden/plantButtonAtom';
import { motion } from 'framer-motion-3d';
import positionAtom from 'store/garden/positionAtom';

function SelectPanel() {
  const [position, setPosition] = useRecoilState(positionAtom);
  const selectedFlower = useRecoilValue(selectedFlowerAtom);

  const [{ hold }, setShow] = useRecoilState(plantButtonAtom);

  return (
    <>
      {selectedFlower && hold ? (
        <mesh
          position={[0, 0, 2]}
          rotation={[degToRad(-90), 0, 0]}
          onPointerMove={e => setPosition(e.point)}
          onPointerUp={() => setShow({ show: true, hold: false })}
        >
          <planeGeometry args={[22, 22]} />
          <meshPhongMaterial color={colors.blue} opacity={0.2} transparent />
        </mesh>
      ) : null}
      {selectedFlower && (
        <SelectedPreview pos={position} data={selectedFlower} />
      )}
    </>
  );
}

export default SelectPanel;

function SelectedPreview({ data, pos }: { data: IFlower; pos: Vector3 }) {
  const [mousePos, setMousePos] = useState();
  const [{ show }, setHold] = useRecoilState(plantButtonAtom);
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

  return (
    // <group position={[(index % 3) * 5 - 4, 0.6, Math.floor(index / 3) * 5 - 5]}>
    <motion.group
      position={pos}
      onPointerDown={e => {
        console.log(e);
        setHold({ show, hold: true });
      }}
    >
      <Center top>
        <primitive object={clone} />
      </Center>
    </motion.group>
  );
}
