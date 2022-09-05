import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import TextFieldComponent from "./TextField.component";
import { createTopic } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import CustomButtonComponent from "./CustomButton.component";

const NewTopicComponent = () => {
  const { newtopic } = useAppSelector((state) => state.topic);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    dispatch(createTopic(e.target.value));
  };

  const handleTopicSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    try {
      const makeTopic = await fetch("/api/createtopic", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ createTopic: newtopic }),
      });
      if (makeTopic.status === 200 && newtopic && newtopic.length > 0) {
        toast.success("Topic created successfully");
        dispatch(createTopic(""));
        return navigate("/");
      } else {
        toast.error("Something went wrong, please check input and make sure you are logged in");
      }
      if (makeTopic.status === 202) {
        return toast.error("Log in or create account to create a topic");
      } else if (makeTopic.status === 400) {
        return toast.error(
          "Topic cannot be empty, please create content to topic"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="post">
        <div>
          <h1>Create Post</h1>
          <form onSubmit={handleTopicSubmit}>
            <div>
              <TextFieldComponent
                value={newtopic}
                type="text"
                onChange={handleChange}
              >
                <CustomButtonComponent type="submit">
                  POST
                </CustomButtonComponent>
              </TextFieldComponent>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default NewTopicComponent;
const Container = styled.div`
  .post {
    text-align: center;
  }
`;
