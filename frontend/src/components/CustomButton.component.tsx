import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IButton {
  style?: object;
  type?: "submit" | "reset" | "button";
  children: ReactNode;
  link?: string;
  //id:any,
  onClick?: (e: any) => void;
  disabled?: boolean;
  onSubmit?: (e: any) => void;
  handleSubmit?:(e:any) =>void;
}

const CustomButtonComponent: FC<IButton> = ({
  style,
  type,
  children,
  onClick,
  //id,
  link,
  disabled,
  onSubmit,
  handleSubmit,
}) => {
  if (link) {
    return (
      <Link to={link}>
        <CustomButton
          type={type ? type : "button"}
          style={style && style}
          onClick={onClick}
          disabled={disabled}
          onSubmit={handleSubmit}
        >
          {children}
        </CustomButton>
      </Link>
    );
  }

  return (
    <CustomButton
      type={type ? type : "button"}
      style={style && style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </CustomButton>
  );
};

export default CustomButtonComponent;
const CustomButton = styled.button`
  outline: none;
  background: var(--moderate-blue);
  border: none;
  color: var(--main-white);
  padding: 12px 1.8rem;
  border-radius: 8px;
  :hover {
    cursor: pointer;
    background: var(--light-grayish-blue);
    transition: background 3s ease-out;
  }
`;
