import React, { FC } from "react";
import { Modal, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Mail, Password } from "../constant/consts";
import styled from "styled-components";
import { toast } from "react-toastify";
import { loginState } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import CustomButtonComponent from "./CustomButton.component";

import {
  createDob,
  createEmail,
  createFirstName,
  createLastName,
  createPassword,
  createUserName,
} from "../redux/features/userprofile";

interface ISignIn {
  signIn: boolean;
  style?: object;
}

const RegisterComponent: FC<ISignIn> = ({ signIn, style, ...props }) => {
  const { user } = useAppSelector((state) => state.profile);
  const createUserProfile = { ...user };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSignIn = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      dispatch(loginState(true));
      const signInUser = await fetch("/api/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstTimeUser: createUserProfile }),
      });

      if (signInUser.status === 200) {
        const response = await signInUser.json();
        const sessionID = response.data;
        localStorage.setItem("item", JSON.stringify(sessionID));
        toast.success("Sign in successful");
        navigate("/");
      } else if (signInUser.status === 400) {
        toast.error("Incorrect username or password, please try again");
        navigate("/");
      }
    } catch (error) {
      console.log(e);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    try {
      const createUser = await fetch("/api/newuser", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstTimeUser: createUserProfile }),
      });
      if (createUser.status === 200) {
        toast.success("User Created");
        navigate("/login");
      }

      if (createUser.status === 400) {
        toast.error("Account cannot be created at this time. Try again Later");
      }
      if (createUser.status === 404) {
        toast.error("Account cannot be created at this time. Try again Later");
      }
    } catch (e) {}
  };
  return (
    <Container style={{ ...style }}>
      <Modal.Header>
        <Text id="modal-title" size={18} color="white">
          Welcome to
          <Text b size={18} color="white">
            WeTalk
          </Text>
        </Text>
      </Modal.Header>

      <form onSubmit={onSubmit}>
        <Modal.Body>
          {!signIn && (
            <>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                value={user.firstName}
                onChange={(e) => dispatch(createFirstName(e.target.value))}
                size="lg"
                placeholder="Firstname"
                aria-label="firstname"
                contentLeft={<Mail fill="white" />}
                name="firstName"
              />

              <Input
                clearable
                bordered
                fullWidth
                onChange={(e) => dispatch(createLastName(e.target.value))}
                value={user.lastName}
                color="primary"
                size="lg"
                placeholder="Lastname"
                aria-label="lastname"
                contentLeft={<Mail fill="white" />}
                name="lastName"
              />

              <Input
                clearable
                bordered
                type="date"
                fullWidth
                color="primary"
                onChange={(e) => dispatch(createDob(e.target.value))}
                value={user.dob}
                size="lg"
                //placeholder="dobllll"
                aria-label="birthday"
                contentLeft={<Mail fill="white" />}
                name="dob"
              />
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                onChange={(e) => dispatch(createEmail(e.target.value))}
                value={user.email}
                size="lg"
                placeholder="Email"
                aria-label="email"
                contentLeft={<Mail fill="white" />}
                name="email"
              />
            </>
          )}
          <Input
            clearable
            bordered
            fullWidth
            onChange={(e) => dispatch(createUserName(e.target.value))}
            value={user.username}
            color="primary"
            size="lg"
            placeholder="Username"
            aria-label="username"
            contentLeft={<Mail fill="white" />}
            name="username"
          />

          <Input
            clearable
            bordered
            onChange={(e) => dispatch(createPassword(e.target.value))}
            value={user.password}
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            name="password"
            aria-label="password"
            contentLeft={<Password fill="white" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14} color="white">
                Remember me
              </Text>
            </Checkbox>
            <Text size={14} color="white">
              Forgot password?
            </Text>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          {signIn ? (
            <CustomButtonComponent onClick={handleSignIn}>
              Sign in
            </CustomButtonComponent>
          ) : (
            <CustomButtonComponent type="submit">
              Join WeTalk
            </CustomButtonComponent>
          )}
        </Modal.Footer>
      </form>
    </Container>
  );
};
export default RegisterComponent;
const Container = styled.div`
  margin: 0 auto;
  align-items: center;
  .date_picker {
    border-radius: 100rem;
    padding: 5px;
  }

  form {
    width: 500px;
    max-width: 90vw;
    input {
      color: white;
      ::placeholder {
        color: white;
        font-style: italic;
      }
    }
  }
`;
