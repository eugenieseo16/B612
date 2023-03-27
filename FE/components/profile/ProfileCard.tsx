import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import roomIndexAtom from 'store/profile/roomIndexAtom';

import SSF from '../../assets/imgs/ssf.png';

function ProfileCard({ user }: { user: IUser }) {
  const setRoomIndex = useSetRecoilState(roomIndexAtom);
  return (
    <StyledProfileCard>
      <div className="detail-container">
        <div className="planet-owner">
          <div className="member-info">
            <img
              src="https://i.pinimg.com/236x/df/3c/4d/df3c4dcf15935d0111426bb28b12d9b1.jpg"
              alt=""
            />
            <h6>사용자 이름 #7</h6>
            <span></span>
          </div>

          <div>
            <button onClick={() => setRoomIndex(1)}>자세히 보기</button>
          </div>
        </div>
      </div>
    </StyledProfileCard>
  );
}

export default ProfileCard;

export const StyledProfileCard = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 3rem;
  z-index: 99;

  width: 30em;
  background: rgba(174, 197, 255, 0.7);
  box-shadow: 0px 0px 15px 7px #aec5ff;

  border-radius: 2rem;
  .detail-container {
    padding: 1.5rem;

    .planet-owner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .member-info {
        display: flex;
        align-items: center;
        img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
      }
    }

    button {
      height: 2rem;
      width: 8rem;

      font-size: 1.2rem;
      color: #252530;

      border: none;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.7);
    }
  }
`;
