import { Center, useGLTF } from '@react-three/drei';
import { FLOWERS_LIST } from 'utils/flowerDataList';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Box3, Vector3 } from 'three';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import plantedFlowersAtom from 'store/garden/plantedFlowersAtom';
function Flowers() {
  // const flowersList: IFlower[] = [
  //   {
  //     createdAt: '',
  //     onSale: false,
  //     roseColor: '',
  //     roseTokenId: '21sda',
  //     roseType: 1,
  //     userAddress: '',
  //   },
  //   {
  //     createdAt: '',
  //     onSale: false,
  //     roseColor: '',
  //     roseTokenId: '123asasd',
  //     roseType: 2,
  //     userAddress: '',
  //   },
  //   {
  //     createdAt: '',
  //     onSale: false,
  //     roseColor: '',
  //     roseTokenId: '12ssdffhgs',
  //     roseType: 3,
  //     userAddress: '',
  //   },
  // ];
  const flowersList = useRecoilValue(plantedFlowersAtom);
  return (
    <>
      {flowersList?.map((data: IFlower) => (
        <Flower key={data.flowerNftId} data={data} />
      ))}
    </>
  );
}

export default Flowers;

function Flower({ data }: { data: IFlower }) {
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
    <group
      position={[
        data.flowerLocationX,
        data.flowerLocationY,
        data.flowerLocationZ,
      ]}
    >
      <Center top>
        <primitive object={clone} />
      </Center>
    </group>
  );
}
