import Earth from '../assets/imgs/tierIcons/1.png';
import Star from '../assets/imgs/tierIcons/2.png';
import Rose from '../assets/imgs/tierIcons/3.png';
import Fox from '../assets/imgs/tierIcons/4.png';
import Rock from '../assets/imgs/tierIcons/5.png';

export const tierDataList = new Map<string, string>();
tierDataList.set('지구', Earth.src);
tierDataList.set('별', Star.src);
tierDataList.set('장미', Rose.src);
tierDataList.set('여우', Fox.src);
tierDataList.set('돌멩이', Rock.src);
