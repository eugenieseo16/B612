import React, { useState } from 'react';
import { PinkButton } from './GlowingButtonEmotion';
import { iconDataList } from '../../utils/iconDataList';

interface GlowingButtonProps {
  icon: string;
}

export default function PinkGlowingButton({ icon }: GlowingButtonProps) {
  const [selected, setSelected] = useState(false);
  const iconImg = iconDataList.get(icon);

  return (
    <>
      <PinkButton>
        <div
          className={selected ? 'selected' : 'default'}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          <img src={iconImg} alt="" />
        </div>
      </PinkButton>
    </>
  );
}
