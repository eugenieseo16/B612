import { Center } from '@react-three/drei';
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import gardenIndexAtom from 'store/garden/gardenIndexAtom';
import plantedFlowersAtom from 'store/garden/plantedFlowersAtom';
import selectedFlowerAtom from 'store/garden/selectedFlowerAtom';
import { degToRad } from 'three/src/math/MathUtils';

function SelectPanel() {
  const [gardenIndex, setGardenIndex] = useRecoilState(gardenIndexAtom);
  const [selectedFlower, setSelectedFlower] =
    useRecoilState(selectedFlowerAtom);
  const [plantedFlowers, setPlantedFlowers] =
    useRecoilState(plantedFlowersAtom);

  const handleClick = (pos: [number, number, number]) => () => {
    if (selectedFlower)
      setPlantedFlowers([
        ...plantedFlowers,
        { ...selectedFlower, position: pos },
      ]);
    setGardenIndex(-1);
    setSelectedFlower(null);
    console.log(pos);
    console.log(pos);
  };

  return (
    <>
      {gardenIndex === 1
        ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map((el, i: number) => {
            const pos: [number, number, number] = [
              (i % 3) * 5 - 4,
              1,
              Math.floor(i / 3) * 5 - 5,
            ];

            return (
              <Center
                onClick={handleClick(pos)}
                key={i}
                rotation={[degToRad(-90), 0, 0]}
                position={pos}
              >
                <mesh>
                  <planeGeometry />
                  <meshNormalMaterial />
                </mesh>
              </Center>
            );
          })
        : null}
    </>
  );
}

export default SelectPanel;
