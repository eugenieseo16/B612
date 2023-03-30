import React from 'react';
import { GlowButton } from './GlowingButtonEmotion';

import { iconDataList } from '../../utils/iconDataList';
import { shadowGenerator } from 'styles/utils';

interface GlowingButtonProps {
  icon: string;
  bgColor?: string;
  selected?: boolean;
  defaultColor?: string;
  onClick?: () => void;
}

export default function GlowingButton({
  icon,
  selected = false,
  onClick,
  bgColor = '#bcf0fa',
  defaultColor = '#a9d8e0',
}: GlowingButtonProps) {
  const iconImg = iconDataList.get(icon);

  return (
    <GlowButton
      onClick={onClick}
      selectedShadow={shadowGenerator(bgColor)}
      defaultShadow={defaultColor}
      bgColor={bgColor}
    >
      <div className={selected ? 'selected' : 'default'}>
        <img src={iconImg} alt="" />
      </div>
    </GlowButton>
  );
}
