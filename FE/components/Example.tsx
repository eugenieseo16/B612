import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import planetAtom from 'store/planetsAtom';
import userAtom from 'store/userAtom';
import Web3 from 'web3';

function Example() {
  const ref = useRef<HTMLInputElement>(null);
  const user = useRecoilValue(userAtom);
  const planets = useRecoilValue(planetAtom);

  const handleClick = () => {
    if (!ref.current?.value) return;

    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: '0x4a3d1539c3800e411C9925E37703d6993383aad1',
          from: user?.memberAddress,
          value: Web3.utils.toHex(+ref.current?.value * 10 ** 18),
        },
      ],
    });
  };
  return (
    <div>
      <h2>잔고 {user?.eth} GoerliETH</h2>
      <h2>나의 planet Token : {planets.length}</h2>
      {planets.map((planet, i) => (
        <div key={i}>{planet.planetName}</div>
      ))}
      <div style={{ marginTop: '2rem' }}>
        <h1>이령이한테 토큰보내기</h1>
        <input type="number" ref={ref} />
        ETH
        <button onClick={handleClick}>SUBMIT</button>
      </div>
    </div>
  );
}

export default Example;
