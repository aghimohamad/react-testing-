import styled from 'styled-components';
import { BsChevronCompactRight } from 'react-icons/bs';

import type { ButtonProps } from '../button';

const StyledButton = styled.button`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-100%);
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin: 0;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background: #ffffff66;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  & > svg {
    color: white;
    transition: 0.1s;
  }
`;

const SlideNextButton = ({ onClick }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <BsChevronCompactRight size={30} />
    </StyledButton>
  );
};

export default SlideNextButton;