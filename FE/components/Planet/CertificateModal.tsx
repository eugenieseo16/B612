import React, { memo, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import styled from '@emotion/styled';
import { Modal } from '@mui/material';
import { useRecoilState } from 'recoil';
import mainModalAtom from 'store/main/mainModalAtom';

import planet_certificate from '../../assets/imgs/certifications/planet_certificate.png';
import kakao from '../../assets/imgs/certifications/shareButtons/kakao.png';
import message from '../../assets/imgs/certifications/shareButtons/message.png';
import download from '../../assets/imgs/certifications/shareButtons/download.png';

const CertificateModal = memo(function SomeComponent() {
  const [{ certificate }, setModalOpen] = useRecoilState(mainModalAtom);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const user = useRecoilValue(userAtom);

  const memberNickname = user?.memberNickname;
  const memberTier = user?.memberTierName;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      setGetCtx(ctx);
    }
  }, []);

  const [painting, setPainting] = useState(false);

  const drawFn = (e: any) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    console.log();
    if (getCtx) {
      if (!painting) {
        getCtx.beginPath();
        getCtx.moveTo(mouseX, mouseY);
      } else {
        getCtx.lineTo(mouseX, mouseY);
        getCtx.stroke();
      }
    }
  };

  return (
    <Modal
      open={certificate}
      onClose={() => setModalOpen({ certificate: false, friend: false })}
    >
      <StyledModal>
        <h3>인증서 발급하기</h3>
        <img src={planet_certificate.src} alt="" style={{ width: '70%' }} />

        <div
          style={{
            position: 'absolute',
            top: '250px',
            display: 'flex',
            alignContent: 'center',
            flexDirection: 'column',
          }}
        >
          <span style={{ color: 'white', padding: '3px' }}>
            머무르다 B612에 따라 {memberNickname} 사용자가 {memberTier} 계급
            임을 증명합니다.
          </span>
        </div>

        {/* <h3>머무르다 B612에 따라 멋진 행성 #0 사용자가</h3>
        <h3>끝없는 젤리처럼 조용한 고요별의</h3>
        <h3>소유자임을 증명합니다.</h3> */}

        <p>날짜:</p>
        <span>
          {year}년 {month}월 {date}일
        </span>

        <p>싸인</p>
        <canvas
          ref={canvasRef}
          id="signCanvas"
          style={{ border: '3px solid black' }}
          width={166}
          height={90}
          onMouseDown={() => setPainting(true)}
          onMouseUp={() => setPainting(false)}
          onMouseMove={e => drawFn(e)}
          onMouseLeave={() => setPainting(false)}

          // onMouseDown={startDraw}
          // onMouseUp={stopDraw}
          // onMouseMove={drawing}
          // onMouseLeave={stopDraw}
          // onTouchStart={startDraw}
          // onTouchMove={drawing}
          // onTouchEnd={stopDraw}
        ></canvas>
        <button>다시그리기</button>
        <button>서명 완료</button>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ShareIcon
            src={kakao.src}
            alt=""
            // onClick={shareToKatalk}
          />
          <ShareIcon src={message.src} alt="" />
          <ShareIcon src={download.src} alt="" />
        </div>
        <a
          href={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7YgyQHsb2IrzIvxBQdI_mhVnWaA8QrIk08OhN4jw9&s'
          }
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          test
        </a>
      </StyledModal>
    </Modal>
  );
});

export default CertificateModal;
const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: rgba(254, 228, 190, 0.7);
  border: none;
  border-radius: 30px;
  padding: 30px;
`;

const ShareIcon = styled.img`
  width: 7%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;
