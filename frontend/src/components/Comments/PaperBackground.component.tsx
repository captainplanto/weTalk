import React, { FC, ReactNode } from "react";
import styled from "styled-components";
interface IPaper {
  children: ReactNode;
  style?: object;
  className?: string;
}
const PaperBackgroundComponent: FC<IPaper> = ({
  children,
  style,
  className,
  ...props
}) => {
  if (className === "profile_paper") {
    return (
      <RightCardBackground style={{ ...style }} className={className}>
        {children}
      </RightCardBackground>
    );
  } else if (className === "homepage_paperbackground") {
    return (
      <HomePageBackground style={{ ...style }} className={className}>
        {children}
      </HomePageBackground>
    );
  } else {
    return (
      <ProfileBackground style={{ ...style }} className={className}>
        {children}
      </ProfileBackground>
    );
  }
};

export default PaperBackgroundComponent;
const RightCardBackground = styled.div`
  width: 65%;
  padding: 2rem;
  background: white;
  border-radius: 5px;

`;

const HomePageBackground = styled.div`
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

const ProfileBackground = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 5px;
  margin: 0 auto;
  justify-contents: center;
  @media screen and (max-width: 6000px) {
    width: 32%;
  }

  @media screen and (max-width: 2000px) {
    width: 70%;
  }
  @media screen and (max-width: 950px) {
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    width: 99%;
  }
`;
