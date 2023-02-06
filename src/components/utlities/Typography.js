import styled, { css } from 'styled-components';
import { colors } from '../../style/colors';

export const Paragraph = styled.p`
  line-height: ${(props) => (props.lineH ? props.lineH : 'inherit')};
  text-align: justify;

  span {
    color: ${colors.moderateBlue};
    font-weight: bold;
  }

  ${(props) =>
    props.gray &&
    css`
      color: ${colors.grayBlue};
    `};
`;
