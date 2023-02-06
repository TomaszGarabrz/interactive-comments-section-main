import styled, { css } from 'styled-components';
import { colors } from '../../style/colors';

export const Button = styled.button`
  transition: all 0.2s ease-in-out;
  background-color: red;
  cursor: pointer;
  border: none;
  color: ${(props) => (props.color ? props.color : '#000')};

  ${(props) =>
    props.formButton &&
    css`
      background-color: ${colors.moderateBlue};
      color: ${colors.white};
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: bold;
    `}

  ${(props) =>
    props.action &&
    css`
      background-color: transparent;
      font-size: 0.9rem;
      font-weight: bold;
    `}
  ${(props) =>
    props.score &&
    css`
      background-color: transparent;
      padding: 0.25rem;
      font-size: 1rem;

      &:hover {
        color: ${colors.grayBlue};
      }
    `};

  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 0.6;
  }
`;
