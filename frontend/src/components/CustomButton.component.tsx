import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IButton {
  style?: any;
  type?: "submit" | "reset" | "button";
  children: ReactNode;
  link?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  onSubmit?: (e: any) => void;
  onMouseOver?: (e: any) => void;
  onMouseOut?: (e: any) => void;
  className?: any;
  handleSubmit?: (e: any) => void;
}

const CustomButtonComponent: FC<IButton> = ({
  style,
  type,
  children,
  onClick,
  link,
  disabled,
  onSubmit,
  className,
  handleSubmit,
  onMouseOver,
  onMouseOut,
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
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          className={className}
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
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
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
