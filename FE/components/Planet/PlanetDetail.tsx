import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PlanetDetail } from './PlanetDetailEmotion';

import dayjs from 'dayjs';
// import Goerli from '../../assets/imgs/goerli-eth.png';

import { usePlanetContract } from '@components/contracts/planetToken';
import { planetNameParser } from 'utils/planetUtil';
import { usePlanetOwnerAPI } from 'API/planetAPIs';
import { tierDataList } from 'utils/tierDataList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { requestFriendAPI, useIsFriendAPI } from 'API/friendAPIs';
import styled from '@emotion/styled';
import { colors } from 'styles/colors';
import loadingAtom from 'store/loadingAtom';

function PlanetDetailCard() {
  const user = useRecoilValue(userAtom);

  const router = useRouter();
  const planetId = router.query?.planetId;
  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState<IPlanet | null>(null);

  // DB데이터
  const ownerData = usePlanetOwnerAPI(planetDetail?.userAddress);

  // 솔리디티 데이터
  useEffect(() => {
    if (!planetId) return;
    planetContract?.methods
      .b612AddressMap(planetId)
      .call()
      .then((data: IPlanet) => {
        setPlanetDetail(data);
      });
  }, [planetContract, planetId]);

  // 팔기 기능
  const [desiredAmount, setDesiredAmount] = useState('0');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!user?.isApproved) {
      toast.error(
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <p>판매권한을 수락해주세요</p>
          <Button
            variant="contained"
            color="error"
            onClick={() => router.push(`/profile/${user?.memberId}`)}
          >
            <span style={{ color: '#fff' }}>프로필로 이동</span>
          </Button>
        </div>,
        {
          icon: null,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
      // alert('프로필에서 판매권한을 수락해주세요');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSale = async () => {
    if (loading) {
      alert('미완료된 계약이 있습니다');
      return;
    }
    if (!user) {
      alert('로그인 해주세요');
      return;
    }

    setLoading({ loading: true, type: 'planet' });

    setOpen(false);

    const planetPrice = (+desiredAmount * 10 ** 18).toString();
    try {
      await planetContract?.methods
        .setForSalePlanetToken(planetId, planetPrice)
        .send({ from: user?.memberAddress });
    } catch (e) {
      setLoading({
        loading: false,
        type: 'flower',
        message: '판매를 실패하였습니다.',
      });
      return;
    }
    setLoading({
      loading: false,
      type: 'flower',
      message: '경매장 등록 완료',
    });
  };

  const handleDiscardSale = async () => {
    setLoading({ loading: true, type: 'flower' });

    try {
      await planetContract?.methods
        .discardForSalePlanetToken(planetId)
        .send({ from: user?.memberAddress });
    } catch (e) {
      setLoading({
        loading: false,
        type: 'flower',
        message: '실패하였습니다.',
      });
      return;
    }
    setLoading({
      loading: false,
      type: 'flower',
      message: '성공하였습니다.',
    });
  };

  const [submit, setSubmit] = useState(false);
  const isFriend = useIsFriendAPI(user?.memberId, ownerData?.memberId);
  const [{ loading }, setLoading] = useRecoilState(loadingAtom);

  const requestFriend = () => {
    if (submit) return;
    setSubmit(true);
    requestFriendAPI(user?.memberId, ownerData?.memberId);
  };

  const [adj, title] = planetNameParser(planetDetail?.planetName);

  const handlePurchase = () => {};

  return (
    <>
      <PlanetDetail>
        {/* Same as */}
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
                {planetDetail?.createdAt
                  ? dayjs(+planetDetail?.createdAt * 1000).format('YYYY-MM-DD')
                  : '0000-00-00'}
              </p>
            </div>
            {/* <div className="planet-price">
            <img src={Goerli.src} alt="Goerli Ethereum" id="goerli-ethereum" />
            <span>{planetPrice ? planetPrice * 10 ** -18 : 0} GETH</span>
          </div> */}
          </div>

          {user?.memberId === ownerData?.memberId ? (
            // 본인 소유 행성일 때
            <div className="for-sale-button">
              {planetDetail?.onSale === false ? (
                <button onClick={handleClickOpen}>팔기</button>
              ) : (
                <button onClick={handleDiscardSale}>팔기 취소</button>
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
                      // 여기
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
              {!user ? null : isFriend === 'notRequest' && !submit ? (
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
              {planetDetail?.onSale && (
                <button onClick={handlePurchase}>구매</button>
              )}
            </div>
          )}
        </div>
      </PlanetDetail>
    </>
  );
}

const FriendButton = styled(Button)`
  width: 5rem;
  background-color: ${colors.purple};
  border-radius: 1rem;
  font-family: 'WILD-MAYO';
`;
export default PlanetDetailCard;
