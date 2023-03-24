import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';
import { shadowGenerator } from 'styles/utils';

export const PinkButton = styled.div`
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    background-color: rgb(244, 193, 174, 0.7);
    border: solid white 4px;
    border-radius: 12px;
    box-shadow: 0px 0px 15px 7px #f4c1ae;
  }
  .default {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(244, 193, 174, 0.4);
    border-radius: 12px;

    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 15px 7px #f4c1ae;
  }

  img {
    width: 55px;
    height: 55px;
  }
`;

export const PurpleButton = styled.div`
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    background-color: rgb(207, 181, 242, 0.7);
    border: solid white 4px;
    border-radius: 12px;
    box-shadow: 0px 0px 15px 7px #cfb5f2;
  }
  .default {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(207, 181, 242, 0.4);
    border-radius: 12px;

    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 15px 7px #cfb5f2;
  }

  img {
    width: 55px;
    height: 55px;
  }
`;

export const YellowButton = styled.div`
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    background-color: rgb(254, 228, 190, 0.7);
    border: solid white 4px;
    border-radius: 12px;
    box-shadow: 0px 0px 15px 7px #e4cba6;
  }
  .default {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(254, 228, 190, 0.4);
    border-radius: 12px;

    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 15px 7px #e4cba6;
  }

  img {
    width: 55px;
    height: 55px;
  }
`;

export const BlueButton = styled.div`
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    background-color: rgb(188, 240, 250, 0.7);
    border: solid white 4px;
    border-radius: 12px;
    box-shadow: 0px 0px 15px 7px #bcf0fa;
  }
  .default {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(188, 240, 250, 0.4);
    border-radius: 12px;

    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 15px 7px #a9d8e0;
  }

  img {
    width: 55px;
    height: 55px;
  }
`;

export const GlowButton = styled.div<any>`
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    background-color: ${p => rgba(p.bgColor, 0.7)};

    border: solid white 4px;
    border-radius: 12px;
    box-shadow: ${p => p.selectedShadow};
  }
  .default {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${p => rgba(p.bgColor, 0.4)};

    border-radius: 12px;

    width: 80px;
    height: 80px;
    box-shadow: ${p => shadowGenerator(p.defaultShadow)};
  }

  img {
    width: 55px;
    height: 55px;
  }
`;
