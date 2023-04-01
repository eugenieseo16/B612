import { Center, useGLTF } from '@react-three/drei';
import { FLOWERS_LIST } from 'utils/flowerDataList';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Box3, DoubleSide, Vector3 } from 'three';
import { useEffect } from 'react';
function Flowers() {
  const flowersList: IFlower[] = [
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: '21sda',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: '123asasd',
      roseType: '2',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: '12ssdffhgs',
      roseType: '3',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfhgjfs1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfhsa12gj1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfhgdg0su9fj1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfhg3465tgj1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'df1245ggj1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfhgg456732j1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfhg385gj1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfh124gj1',
      roseType: '1',
      userAddress: '',
    },
    {
      createdAt: '',
      onSale: false,
      roseColor: '',
      roseTokenId: 'dfh5836gj1',
      roseType: '1',
      userAddress: '',
    },
  ];
  return (
    <>
      {flowersList.map((data, i: number) => (
        <Flower key={data.roseTokenId} data={data} index={i} />
      ))}
    </>
  );
}

export default Flowers;

function Flower({ data, index }: { data: IFlower; index: number }) {
  const { scene } = useGLTF(FLOWERS_LIST[+data.roseType]);
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
    <group position={[(index % 3) * 5 - 4, 0.6, Math.floor(index / 3) * 5 - 5]}>
      <Center top>
        <primitive object={clone} />
      </Center>
    </group>
  );
}
