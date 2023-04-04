import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Avatar, Input } from '@mui/material';
import left from '../../../assets/imgs/buttonIcons/chevron-left.svg';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { colors } from 'styles/colors';
import userAtom from 'store/userAtom';
import { changeNickNameAPI } from 'API/memberAPIs';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

interface IEditData {
  memberNickname: string;
  memberImage?: string;
}

function AvatarContainer() {
  const setRoomIndex = useSetRecoilState(roomIndexAtom);
  const [me, setMe] = useRecoilState(userAtom);

  const defaultData: IEditData = {
    memberNickname: me?.memberNickname ? me?.memberNickname : '',
    memberImage: me?.memberImage,
  };

  const [imageData, setImageData] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(defaultData);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Container>
        <Button onClick={() => setRoomIndex(0)}>
          <img
            src={left.src}
            alt=""
            style={{ width: '2rem', height: '2rem' }}
          />
        </Button>
        {!isEdit ? (
          <Avatar
            src={editValue?.memberImage}
            sx={{ width: '4rem', height: '4rem' }}
          />
        ) : (
          <>
            <label htmlFor="upload-profile">
              <Avatar
                src={editValue.memberImage}
                sx={{ width: '4rem', height: '4rem', cursor: 'pointer' }}
              />
            </label>
            <input
              onChange={e => {
                if (!e.target.files) return;
                setEditValue({
                  ...editValue,
                  memberImage: URL.createObjectURL(e.target.files[0]),
                });
                setImageData(e.target.files[0]);
              }}
              type="file"
              id="upload-profile"
              style={{ display: 'none' }}
            />
          </>
        )}
        {!isEdit ? (
          <h1 style={{ fontSize: '1.4rem' }}>{editValue?.memberNickname}</h1>
        ) : (
          <Input
            onChange={e =>
              setEditValue({ ...editValue, memberNickname: e.target.value })
            }
            defaultValue={editValue?.memberNickname}
            inputProps={{ 'aria-label': 'description' }}
            sx={{ fontSize: '1.4rem', fontFamily: 'pixel' }}
          />
        )}
      </Container>
      {!isEdit ? (
        <Button
          color="info"
          variant="contained"
          onClick={() => setIsEdit(true)}
        >
          <span>수정</span>
        </Button>
      ) : (
        <div style={{ display: 'flex', gap: '0.2rem' }}>
          <Button
            onClick={() => {
              setIsEdit(false);
              setEditValue(defaultData);
            }}
            color="error"
            variant="contained"
          >
            <ClearIcon sx={{ color: 'white' }} />
          </Button>
          <Button
            onClick={() => {
              // axios
              if (!me) return;
              setEditValue({ ...me, ...editValue });
              setIsEdit(false);
              setMe({ ...me, ...editValue });

              changeNickNameAPI({
                changedNickname: editValue.memberNickname,
                memberId: me.memberId,
              });
            }}
            color="success"
            variant="contained"
          >
            <DoneIcon sx={{ color: 'white' }} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default AvatarContainer;

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
