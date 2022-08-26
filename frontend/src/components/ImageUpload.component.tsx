import React, { FC, FormEventHandler } from "react";
import styled from "styled-components";
import CustomButtonComponent from "./CustomButton.component";

interface IImageInput {
  value?: any;
  type: string;
  name: string;
  onClick?: (e: FormEventHandler<HTMLInputElement>) => void;
  style?: object;
  outline?: string;
  defaultValue?: string;
  accept?: string;
  onChange: (e: any) => void;
  //onSubmit: (e: any) => void;
}

const ImageUploadComponent: FC<IImageInput> = ({
  value,
  type,
  onClick,
  name,
  outline,
  accept,
  style,
  onChange,
//  onSubmit,
  ...props
}) => {
  return (
    <>
      <Container>
    
          <input
            value={value}
            style={{ ...style }}
            onChange={onChange}
            accept={accept}
            name={name}
            type={type}
          />
        
   
      </Container>
    </>
  );
};

export default ImageUploadComponent;

const Container = styled.div`
  display: flex;
  gap: 1rem;
  textarea {
    width: 30rem;
    height: 10rem;
    outline: none;
    resize: none;
    border-radius: 10px;
    :hover {
      border: 2px solid var(--moderate-blue);
    }
  }
`;
