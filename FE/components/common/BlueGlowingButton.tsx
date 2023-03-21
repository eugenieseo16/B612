import React, { useState } from 'react';
import { BlueButton } from './GlowingButtonEmotion';

import { iconDataList } from '../../utils/iconDataList';

interface GlowingButtonProps {
  icon: string;
}

export default function BlueGlowingButton({ icon }: GlowingButtonProps) {
  const [selected, setSelected] = useState(false);
  const iconImg = iconDataList.get(icon);

  return (
    <>
      <BlueButton>
        <div
          className={selected ? 'selected' : 'default'}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          <img src={iconImg} alt="" />
        </div>
      </BlueButton>
    </>
  );
}
