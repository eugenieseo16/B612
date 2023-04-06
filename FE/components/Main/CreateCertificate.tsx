import React from 'react';
import styled from '@emotion/styled';
import Template from '../../assets/imgs/certifications/tier_certificate_template.png';
import SignaturePad from 'react-signature-canvas';
import SignatureCanvas from 'react-signature-canvas';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

function CreateCertificate() {
  const user = useRecoilValue(userAtom);

  const memberNickname = user?.memberNickname;
  const memberTier = user?.memberTierName;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const [dataURL, setDataURL] = React.useState<string | null>(null);
  const padRef = React.useRef<SignatureCanvas>(null);

  const clear = () => {
    padRef.current?.clear();
  };

  const trim = () => {
    const url = padRef.current?.getTrimmedCanvas().toDataURL('image/png');
    if (url) setDataURL(url);
  };

  const onDownload = () => {
    const domElement = document.getElementById('certificate');
    if (domElement !== null) {
      htmlToImage
        .toJpeg(domElement)
        .then((dataUrl: string) => {
          console.log(dataUrl);
          download(dataUrl, 'image.jpg');
        })
        .catch((error: Error) => {
          console.error('oops, something went wrong!', error);
        });
    }
  };
  return (
    <>
      <p style={{ padding: '20px' }}>싸인 후 인증서를 발급 받을 수 있습니다.</p>
      <div style={{ border: 'solid 1px' }}>
        <SignaturePad
          ref={padRef}
          canvasProps={{ className: 'sigCanvas' }}
          penColor="white"
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <p>인증서 발급 일자: </p>
        <span>
          {year}년 {month}월 {date}일
        </span>
      </div>

      <div>
        <SignatureButton onClick={trim}>제출</SignatureButton>
        <SignatureButton onClick={clear}>다시 그리기</SignatureButton>
      </div>

      {/* <button onClick={onDownload}>test</button> */}
      {dataURL ? (
        <div style={{ position: 'relative', width: '946px' }} id="certificate">
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              // width: '100%',
            }}
          >
            <img src={Template.src} alt="" style={{ width: '100%' }} />
          </div>

          {/* 싸인 */}
          <div
            style={{
              position: 'absolute',
              top: '500px',
              left: '200px',
            }}
          >
            <img
              src={dataURL}
              alt=""
              style={{ filter: 'brightness(100%)', width: '100px' }}
            />
          </div>

          {/* 날짜 */}
          <div
            style={{
              position: 'absolute',
              top: '530px',
              right: '170px',
            }}
          >
            <h6 style={{ color: 'white' }}>
              {year}-{month}-{date}
            </h6>
          </div>

          {/* 인증 내용 */}
          <div
            style={{
              position: 'absolute',
              top: '280px',
              right: '225px',
            }}
          >
            <p
              style={{ color: '#70cfdb', textAlign: 'center', padding: '10px' }}
            >
              머무르다 B612에 따라 사용자 {memberNickname}가
            </p>
            <p style={{ color: '#70cfdb', textAlign: 'center' }}>
              {memberTier} 계급임을 증명합니다.
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CreateCertificate;

const SignatureButton = styled.button`
  background-color: #f4c1ae;
  margin: 0px 10px;
  margin-bottom: 50px;
  padding: 10px;
  border-radius: 3rem;
  border: none;
  width: 100px;
`;
