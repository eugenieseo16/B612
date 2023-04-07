import React from 'react';
const iframe = () => {
  return {
    __html: `<iframe width="100%" height="800px" src="/notion/튜토리얼 6c174ae9355946ed987ecdd3740f19eb.html"></iframe>`,
  };
};

function tutorial() {
  return (
    <div style={{ height: '100vh', paddingTop: '4rem' }}>
      <div dangerouslySetInnerHTML={iframe()}></div>
    </div>
  );
}

export default tutorial;
