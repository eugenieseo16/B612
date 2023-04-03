import React, { useState } from 'react';
import { YellowButton } from './GlowingButtonEmotion';
import { iconDataList } from '../../utils/iconDataList';

interface GlowingButtonProps {
  icon: string;
}

export default function YellowGlowingButton({ icon }: GlowingButtonProps) {
  const [selected, setSelected] = useState(false);
  const iconImg = iconDataList.get(icon);

  return (
    <>
      <YellowButton>
        <div
          className={selected ? 'selected' : 'default'}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          <img src={iconImg} alt="" />
        </div>
      </YellowButton>
    </>
  );
}
