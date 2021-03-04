import React from "react";
import styled from "styled-components";

const fontFamily = 'font-family: "Roboto", sans-serif;';
export const H2 = ({ children, ...rest }) => {
  return <Title2 {...rest}>{children}</Title2>;
};

const Title2 = styled.h2`
  ${fontFamily}
  font-size: 24px;
  color: ${({ theme }) => theme.palette.text};
  font-weight: bold;
  padding: 0;
  margin: 0;
`;

export const P2 = ({ children, ...rest }) => {
  return <Paragrapsh2 {...rest}>{children}</Paragrapsh2>;
};

const Paragrapsh2 = styled.p`
  padding: 0;
  margin: 0;
  ${fontFamily}
  font-size: 18px;
  color: ${({ theme }) => theme.palette.text};
`;
