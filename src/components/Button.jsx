import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.button};
  color: ${({ theme }) => theme.palette.text};
  font-weight: bold;
  padding: 12px 0;
  min-width: 212px;
  border: none;
  border-radius: 8px;

  :focus {
    outline: none;
  }

  :active {
    background-color: transparent;
  }

  :hover {
    cursor: pointer;
  }
`;

export default Button;
