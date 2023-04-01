import Flowers from '@components/garden/Flowers';
import Garden from '@components/garden/Garden';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useUserById } from 'API/memberAPIs';
import { MotionCanvas } from 'framer-motion-3d';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import userAtom from 'store/userAtom';

function GardenPage() {
  const { query } = useRouter();
  const me = useRecoilValue(userAtom);
  const user = useUserById(query?.userId);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <div style={{ height: '100vh' }}>
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
