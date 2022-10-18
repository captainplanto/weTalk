import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import PaperBackgroundComponent from "./Comments/PaperBackground.component";
import { SearchComponent } from "./Search.component";

interface IInput {
  value?: string;
  type: string;
  name?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  style?: object;
  outline?: string;
  children?: ReactNode;
  defaultValue?: string;
}

const TextFieldComponent: FC<IInput> = ({
  value,
  type,
  onChange,
  name,
  outline,
  style,
  children,
  defaultValue,
  ...props
}) => {
  const { openReplyToBox } = useAppSelector((state) => state.topic);
  return (
    <div>
      {openReplyToBox ? (
        <Outer style={{ marginTop: "1rem" }}>
          <PaperBackgroundComponent className="homepage_paperbackground">
            <Container>
              <div>
                <textarea
                  value={value}
                  style={{ ...style }}
                  onChange={onChange}
                  defaultValue={defaultValue}
                  name={name}
                />
              </div>
              <div>{children}</div>
            </Container>
          </PaperBackgroundComponent>
        </Outer>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextFieldComponent;
const Outer = styled.div`
  .padding {
    padding: 1rem 0 1rem 0;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 2rem;
  textarea {
    height: 10rem;
    outline: none;
    resize: none;
    border-radius: 10px;
    :hover {
      border: 2px solid var(--moderate-blue);
    }
    @media screen and (max-width: 6000px) {
      width: 20vw;
    }

    @media screen and (max-width: 1000px) {
      width: 50vw;
    }
    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  }
  @media screen and (max-width: 480px) {
    display: block;
    gap: 0px;
  }
`;
