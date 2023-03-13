import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const simpleShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
export const shadowGenerator = (color: string) => `0px 0px 15px 7px ${color}`;
export const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
