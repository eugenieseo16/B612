import Flowers from '@components/garden/Flowers';
import Garden from '@components/garden/Garden';
import GardenNav from '@components/garden/GardenNav';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useUserById } from 'API/memberAPIs';
import { MotionCanvas } from 'framer-motion-3d';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import userAtom from 'store/userAtom';
import Modal from '@mui/material/Modal';
import gardenIndexAtom from 'store/garden/gardenIndexAtom';
import FlowersModal from '@components/common/FlowersModal';

function GardenPage() {
  const { query } = useRouter();
  const me = useRecoilValue(userAtom);
  const user = useUserById(query?.userId);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const [gardenIndex, setGardenIndex] = useRecoilState(gardenIndexAtom);

  return (
    <div style={{ height: '100vh' }}>
      <GardenNav />
      <Modal open={gardenIndex === 0} onClose={() => setGardenIndex(-1)}>
        <FlowersModal user={user} />
      </Modal>
      <MotionCanvas
        shadows
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <RecoilBridge>
          <Garden />
          <Flowers />
        </RecoilBridge>
      </MotionCanvas>
      <Canvas style={{ display: 'none' }}>
        <mesh></mesh>
      </Canvas>
    </div>
  );
}

export default GardenPage;
