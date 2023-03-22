import React, { useState } from 'react';
import { PurpleButton } from './GlowingButtonEmotion';
import { iconDataList } from '../../utils/iconDataList';

interface GlowingButtonProps {
  icon: string;
}

export default function PurpleGlowingButton({ icon }: GlowingButtonProps) {
  const [selected, setSelected] = useState(false);
  const iconImg = iconDataList.get(icon);

  return (
    <>
      <PurpleButton>
        <div
          className={selected ? 'selected' : 'default'}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          <img src={iconImg} alt="" />
        </div>
      </PurpleButton>
    </>
  );
}
