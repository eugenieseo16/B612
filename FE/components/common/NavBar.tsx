import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import '../common/NavBar.styles';

// .wrapper {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 45px;
//   }

function NavBar() {
  return (
    <div className="navigation-bar">
      <nav className="wrapper">
        <div>
          <div>
            <img
              src="https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/bdAk/image/jsdI7JxDHZiqbvsLRUQWPdqU_6c.jpg"
              alt=""
            />
            <h5>머무르다</h5>
          </div>

          <div>
            <h2>홈</h2>
            <h2>명예의 전당</h2>
            <h2>상점</h2>
          </div>
        </div>

        <div>
          <NotificationsNoneIcon />
          <AccountCircleIcon />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
