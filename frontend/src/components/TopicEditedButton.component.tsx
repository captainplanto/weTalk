import React, { FC} from "react";
import { toast } from "react-toastify";
import { useSession } from "../pages/hooks/useSession";
import { dbReplyTopic, dbTopics, ReplyToTopicBox } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ITopicEditedButton } from "../types/type";
import CustomButtonComponent from "./CustomButton.component";

const TopicEditedButtonComponent: FC<ITopicEditedButton> = ({
  id,
  children,
  showTopicEditButton,
  topicOwner,
  topicCommentID,
}) => {
  const { newtopic, openReplyToBox  } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch(); 
  const {session}= useSession();
 // const sessionId = localStorage.getItem("item");
  //const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  //const currentUser = sessionUser.username;
  const handleTopicCommentEdit = async (
    type: "EDIT_TOPIC" | "EDIT_COMMENT"
  ) => {
    if (session && session.username === topicOwner) {
      if (showTopicEditButton) {
        switch (type) {
          case "EDIT_TOPIC":
            try {
              const editTopicRequest = await fetch(`/api/edittopic/${id}`, {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ createTopic: newtopic }),
              });

              if (editTopicRequest.status === 200) {
              dispatch(ReplyToTopicBox(!openReplyToBox))
                const fetchTopic = await fetch("/api/gettopic", {
                  method: "GET",
                });
                const fetchTopicResponse = await fetchTopic.json();
                dispatch(dbTopics(fetchTopicResponse.data));
                toast.success("Topic successfully edited");
              }
              if (editTopicRequest.status === 400) {
                toast.error("You cannot edit topic at this time");
              }
            } catch (err) {}
            break;

          default:
            break;
        }
      } else if (!showTopicEditButton) {
        switch (type) {
          case "EDIT_COMMENT":
            try {
              const editCommentRequest = await fetch(
                `/api/edittopiccomment/${id}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ createTopic: newtopic }),
                }
              );
              if (editCommentRequest.status === 200) {
                const fetchCommentOnTopic = await fetch(
                  `/api/gettopicreply/${topicCommentID}`,
                  {
                    method: "POST",
                  }
                );
                const fetchCommentOnTopicResponse =
                  await fetchCommentOnTopic.json();
                dispatch(dbReplyTopic(fetchCommentOnTopicResponse.data));
              }
              if (editCommentRequest.status === 400) {
                toast.error("You cannot edit comment at this time");
              }
            } catch (err) {}
            break;

          default:
            break;
        }
      }
    } else {
      console.log("you didnt create this comment");
    }
  };
  if (showTopicEditButton) {
    return (
      <CustomButtonComponent
        onClick={() => handleTopicCommentEdit("EDIT_TOPIC")}
      >
        {children}
      </CustomButtonComponent>
    );
  } else {
    return (
      <CustomButtonComponent
        onClick={() => handleTopicCommentEdit("EDIT_COMMENT")}
      >
        {children}
      </CustomButtonComponent>
    );
  }
};
export default TopicEditedButtonComponent;
