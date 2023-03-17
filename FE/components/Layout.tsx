import React from 'react';
import NavBar from '@components/common/NavBar';
import styled from '@emotion/styled';

const HeadingPadding = styled.div`
  padding-top: 5rem;
`;
function Layout() {
  return (
    <div>
      <HeadingPadding>
        <NavBar />
      </HeadingPadding>
    </div>
  );
}

export default Layout;
