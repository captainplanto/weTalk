import React, { FC } from "react";
import { Modal, Text, Input, Row, Checkbox, Loading } from "@nextui-org/react";
import { LoginImageBoiler, Mail, Password } from "../constant/consts";
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
        dispatch(loginState(true));
        const response = await signInUser.json();
        const sessionID = response.data;
        localStorage.setItem("item", JSON.stringify(sessionID));
        toast.success("Sign in successful");
        navigate("/");
      } else if (signInUser.status === 400) {
        toast.error("Incorrect username or password, please try again");
      } else if (signInUser.status === 404) {
        const { message } = await signInUser.json();
        toast.error(message);
      }
    } catch (error) {
      console.log(e);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createUser = await fetch("/api/create/new/user", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstTimeUser: createUserProfile }),
      });
      const { message } = await createUser.json();
      if (createUser.status === 200) {
        toast.success(message);
        navigate("/login");
      } else if (createUser.status === 400) {
        toast.error(message);
      } else if (createUser.status === 404) {
        toast.error(message);
      }
    } catch (e) {
      toast.error("Server error, Please try again later");
    }
  };
  return (
    <Container style={{ ...style }}>
      <Modal.Header>
        <Text size={18} color="white">
          Welcome to
          <Text b size={18} color="white" id="modal-title">
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
  #modal-title {
    padding-left: 3px;
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
