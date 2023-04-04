import Flowers from '@components/garden/Flowers';
import Garden from '@components/garden/Garden';
import GardenNav from '@components/garden/GardenNav';
import { Canvas } from '@react-three/fiber';
import { useUserById } from 'API/memberAPIs';
import { MotionCanvas } from 'framer-motion-3d';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import userAtom from 'store/userAtom';
import Modal from '@mui/material/Modal';
import gardenIndexAtom from 'store/garden/gardenIndexAtom';
import FlowersModal from '@components/common/FlowersModal';
import { usePlantedFlowers } from 'API/flowerAPIs';
import plantedFlowersAtom from 'store/garden/plantedFlowersAtom';
import SelectPanel from '@components/garden/SelectPanel';
import PlantButtons from '@components/garden/PlantButtons';

function GardenPage() {
  const { query } = useRouter();
  const me = useRecoilValue(userAtom);
  const user: IUser = useUserById(query?.userId);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const [gardenIndex, setGardenIndex] = useRecoilState(gardenIndexAtom);
  const isMe = me?.memberId === user?.memberId;
  const plantedFlowers = usePlantedFlowers(user?.memberId);
  const setPlantedFlowers = useSetRecoilState(plantedFlowersAtom);

  useEffect(() => {
    if (plantedFlowers) setPlantedFlowers(plantedFlowers);
    else setPlantedFlowers([]);
  }, [plantedFlowers, setPlantedFlowers]);

  return (
    <div style={{ height: '100vh' }}>
      {/* {isMe ? <h1>나</h1> : null} */}
      {isMe && (
        <>
          <GardenNav />
          <Modal
            open={gardenIndex === 0}
            onClose={() => setGardenIndex(-1)}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FlowersModal user={user} />
          </Modal>
          <PlantButtons />
        </>
      )}

      <Canvas
        shadows
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <RecoilBridge>
          <Garden />
          <Flowers />
          <SelectPanel />
        </RecoilBridge>
      </Canvas>
    </div>
  );
}

export default GardenPage;
