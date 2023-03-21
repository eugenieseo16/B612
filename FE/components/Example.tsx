import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Web3 from 'web3';

function Example() {
  const ref = useRef<HTMLInputElement>(null);
  const user = useRecoilValue(userAtom);

  const transactionParameters = {
    to: '0x4a3d1539c3800e411C9925E37703d6993383aad1', // Required except during contract publications.
    from: user?.memberAddress, // must match user's active address.
    value: '0x100000000', // Only required to send ether to the recipient from the initiating external account.
  };
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
      <h2>나의 planet Token : {user?.planets.length}</h2>
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
