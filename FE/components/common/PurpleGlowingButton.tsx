import React, { useState } from 'react';
import { PurpleButton } from './GlowingButtonEmotion';

import Item from '../../assets/img/moneybag.svg';
import Certificate from '../../assets/img/certificate.svg';
import Friend from '../../assets/img/users.svg';
import Planet from '../../assets/img/planet.svg';

interface GlowingButtonProps {
  icon: string;
}

const iconDataList = new Map<string, string>();
iconDataList.set('item', Item.src);
iconDataList.set('certificate', Certificate.src);
iconDataList.set('friend', Friend.src);
iconDataList.set('planet', Planet.src);

export default function PinkGlowingButton({ icon }: GlowingButtonProps) {
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
