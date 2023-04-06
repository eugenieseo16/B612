import React from 'react';
import styled from '@emotion/styled';

function LikeButton() {
  return (
    <>
      {hovered ? (
        <StyledLikeButton
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {selected ? (
            <img src={dislike.src} alt="" onClick={likeButton} />
          ) : (
            <img src={like.src} alt="" onClick={likeButton} />
          )}
        </StyledLikeButton>
      ) : null}
    </>
  );
}

export default LikeButton;

const StyledLikeButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 47%;
  height: 100vh;
  img {
    width: 10rem;
  }
`;
