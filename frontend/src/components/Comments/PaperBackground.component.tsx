import React, { FC, ReactNode } from "react";
import styled from "styled-components";
interface IPaper {
  children: ReactNode;
  style?:object;
  className?:string;
}
const PaperBackgroundComponent: FC<IPaper> = ({ children, style, className, ...props }) => {
  return <Background style={{...style}} className={className}>{children}</Background>;
};

export default PaperBackgroundComponent;
const Background = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 5px;
  margin: 0 auto;
  justify-contents: center;

  @media screen and (max-width: 6000px) {
    width: 32%;
  }

  @media screen and (max-width: 2000px) {
    width: 35%;
  }
  @media screen and (max-width: 950px) {
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    width: 99%;
  }
`;
