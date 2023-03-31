import React from 'react';
import { GlowButton } from './GlowingButtonEmotion';

import { iconDataList, IconsTypes } from '../../utils/iconDataList';
import { shadowGenerator } from 'styles/utils';
import { useMobile } from '@hooks/useMobile';

interface GlowingButtonProps {
  icon: IconsTypes;
  bgColor?: string;
  selected?: boolean;
  defaultColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlowingButton({
  icon,
  selected = false,
  onClick,
  bgColor = '#bcf0fa',
  defaultColor = '#a9d8e0',
  style,
}: GlowingButtonProps) {
  const iconImg = iconDataList.get(icon);

  return (
    <GlowButton
      onClick={onClick}
      selectedShadow={shadowGenerator(bgColor)}
      defaultShadow={defaultColor}
      bgColor={bgColor}
      style={style}
    >
      <div className={selected ? 'selected' : 'default'}>
        <img src={iconImg} alt="" />
      </div>
    </GlowButton>
  );
}
