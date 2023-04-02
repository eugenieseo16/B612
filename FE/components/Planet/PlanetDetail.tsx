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

  return (
    <PlanetDetail>
      <div className="detail-container">
        <div className="planet-name">
          <h3>{adj}</h3>
          <h2>{title}</h2>
        </div>

        <div className="planet-owner">
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

        <div className="for-sale-button">
          {ownerData?.memberId === user?.memberId ? (
            <button onClick={handleClickOpen}>팔기</button>
          ) : (
            <></>
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
      </div>
    </PlanetDetail>
  );
}

export default PlanetDetailCard;
