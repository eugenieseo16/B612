import React, { useState } from 'react';
import { GlowButton } from './GlowingButtonEmotion';

import { iconDataList } from '../../utils/iconDataList';
import { shadowGenerator } from 'styles/utils';

interface GlowingButtonProps {
  icon: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function GlowingButton({
  icon,
  selected = false,
  onClick,
}: GlowingButtonProps) {
  const iconImg = iconDataList.get(icon);

  return (
    <GlowButton
      onClick={onClick}
      selectedShadow={shadowGenerator('#bcf0fa')}
      defaultShadow={'#a9d8e0'}
      bgColor={'#bcf0fa'}
    >
      <div className={selected ? 'selected' : 'default'}>
        <img src={iconImg} alt="" />
      </div>
    </GlowButton>
  );
}
