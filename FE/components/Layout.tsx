import React from 'react';
import NavBar from '@components/common/NavBar';
import styled from '@emotion/styled';

const HeadingPadding = styled.div`
  padding-top: 4rem;
  position: fixed;
  top: 0;
  z-index: 99;
`;
function Layout() {
  return (
    <HeadingPadding>
      <NavBar />
    </HeadingPadding>
  );
}

export default Layout;
