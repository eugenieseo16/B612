import Item from '../assets/imgs/buttonIcons/moneybag.svg';
import Certificate from '../assets/imgs/buttonIcons/certificate.svg';
import Friend from '../assets/imgs/buttonIcons/users.svg';
import Planet from '../assets/imgs/buttonIcons/planet.svg';
import Plant from '../assets/imgs/buttonIcons/plant.svg';
import Quest from '../assets/imgs/buttonIcons/target-arrow.svg';
import Chair from '../assets/imgs/buttonIcons/armchair.svg';
import Door from '../assets/imgs/buttonIcons/door.svg';
import Home from '../assets/imgs/buttonIcons/home.svg';
import User from '../assets/imgs/buttonIcons/user.svg';
import Left from '../assets/imgs/buttonIcons/chevron-left.svg';
import Right from '../assets/imgs/buttonIcons/chevron-right.svg';

export const iconDataList = new Map<string, string>();
iconDataList.set('item', Item.src);
iconDataList.set('certificate', Certificate.src);
iconDataList.set('friend', Friend.src);
iconDataList.set('planet', Planet.src);
iconDataList.set('plant', Plant.src);
iconDataList.set('quest', Quest.src);
iconDataList.set('chair', Chair.src);
iconDataList.set('door', Door.src);
iconDataList.set('home', Home.src);
iconDataList.set('user', User.src);
iconDataList.set('left', Left.src);
iconDataList.set('right', Right.src);

export type IconsTypes =
  | 'item'
  | 'certificate'
  | 'friend'
  | 'planet'
  | 'plant'
  | 'quest'
  | 'chair'
  | 'door'
  | 'home'
  | 'user'
  | 'left'
  | 'right';
