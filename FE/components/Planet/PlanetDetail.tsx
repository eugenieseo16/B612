import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PlanetDetail } from './PlanetDetailEmotion';

import dayjs from 'dayjs';
import Goerli from '../../assets/imgs/goerli-eth.png';

import { usePlanetContract } from '@components/contracts/planetToken';
import { planetNameParser } from 'utils/planetUtil';
import { usePlanetOwnerAPI } from 'API/planetAPIs';
import { tierDataList } from 'utils/tierDataList';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { requestFriendAPI, useIsFriendAPI } from 'API/friendAPIs';
import axios from 'axios';
import styled from '@emotion/styled';
import { colors } from 'styles/colors';

function PlanetDetailCard() {
  const user = useRecoilValue(userAtom);

  const router = useRouter();
  const planetId = router.query?.planetId;
  const planetContract = usePlanetContract();
  const [planetName, setPlanetName] = useState(null);
  const [planetPrice, setPlanetPrice] = useState(null);
  const [planetCreatedAt, setPlanetCreatedAt] = useState(null);
  const [planetDetail, setPlanetDetail] = useState(null);
  const [memberAddress, setMemberAddress] = useState(null);
  const [isOnSale, setIsOnSale] = useState(null);

  useEffect(() => {
    if (!planetId) return;
    planetContract?.methods
      .b612AddressMap(planetId)
      .call()
      .then((data: any) => {
        setPlanetDetail(data);
        setPlanetPrice(data?.planetPrice);
        setPlanetName(data?.planetName);
        setPlanetCreatedAt(data?.createdAt);
        setMemberAddress(data?.userAddress);
        setIsOnSale(data?.onSale);
      });
  }, [planetContract, planetId]);

  console.log(memberAddress);
  const [adj, title] = planetNameParser(planetName || '');

  const ownerData = usePlanetOwnerAPI(memberAddress);

  // 팔기 기능
  const [desiredAmount, setDesiredAmount] = useState('0');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSale = () => {
    setOpen(false);
    console.log(desiredAmount);
    planetContract?.methods
      .setForSalePlanetToken(planetId, desiredAmount)
      .send({ from: user?.memberAddress });
  };

  const [submit, setSubmit] = useState(false);
  const isFriend = useIsFriendAPI(user?.memberId, ownerData?.memberId);

  const requestFriend = () => {
    if (submit) return;
    setSubmit(true);
    requestFriendAPI(user?.memberId, ownerData?.memberId);
  };

  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-name">
          <h3>{adj}</h3>
          <h2>{title}</h2>
        </div>

        <div
          className="planet-owner"
          onClick={() => router.push(`/profile/${ownerData?.memberId}`)}
          style={{ cursor: 'pointer' }}
        >
          <img src={ownerData?.memberImage} alt="" />
          <h6>{ownerData?.memberNickname}</h6>
          <img
            src={tierDataList.get(ownerData?.memberTierName)}
            alt="member tier"
            id="member-tier-icon"
          />
        </div>

        <div className="planet-detail">
          <div className="planet-date">
            <p>
              등록 날짜:
              {planetCreatedAt
                ? dayjs(planetCreatedAt * 1000).format('YYYY-MM-DD')
                : '0000-00-00'}
            </p>
          </div>
          <div className="planet-price">
            <img src={Goerli.src} alt="Goerli Ethereum" id="goerli-ethereum" />
            <span>{planetPrice ? planetPrice * 10 ** -18 : 0} GETH</span>
          </div>
        </div>

        {ownerData?.memberAddress === user?.memberAddress ? (
          // 본인 소유 행성일 때
          <div className="for-sale-button">
            {isOnSale === false ? (
              <button onClick={handleClickOpen}>팔기</button>
            ) : (
              <button>팔기 취소</button>
            )}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle> 판매를 희망하는 금액을 입력해주세요.</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="desired-amount"
                  label="판매 희망 금액 (GETH)"
                  fullWidth
                  variant="standard"
                  type="number"
                  onChange={e => {
                    setDesiredAmount(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handleSale}>확인</Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          // 타인 소유 행성일 때
          <div className="friend-request-button">
            {isFriend === 'notRequest' && !submit ? (
              <FriendButton onClick={requestFriend}>친구신청</FriendButton>
            ) : isFriend === 'notAccepted' || submit ? (
              <FriendButton disabled style={{ background: 'grey' }}>
                수락대기중
              </FriendButton>
            ) : isFriend === 'friend' ? (
              <Button
                style={{
                  width: '3rem',
                  backgroundColor: colors.yellow,
                  borderRadius: '8px',
                }}
              >
                친구
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </PlanetDetail>
  );
}

const FriendButton = styled(Button)`
  width: 5rem;
  background-color: ${colors.purple};
  border-radius: 1rem;
  font-family: 'WILD-MAYO';
`;
export default PlanetDetailCard;
