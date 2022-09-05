
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dbReplyTopic } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ITopicReplyButton } from "../types/type";
import CustomButtonComponent from "./CustomButton.component";

const TopicReplyButtonComponent: FC<ITopicReplyButton> = ({
  id,
  showTopicReplyButton,
  children,
  className,
  ...props
}) => {
  const { replyTopic } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
    const navigate = useNavigate();
  const ReplyToTopicOrAddComment = async (type: "GETTOPICANDCOMMENT" | "REPLYTOTOPIC") => {
   
    if (showTopicReplyButton === false) {
      switch (type) {
        case "GETTOPICANDCOMMENT":
          try {
            const fetchTopicAndComment = await fetch(`/api/gettopicreply/${id}`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ IncomingTopicID: id }),
              }
            );
            if (fetchTopicAndComment.status === 200) {
                  navigate("/topiccomment");
              const fetchReplyToTopicResponse = await fetchTopicAndComment.json();
             dispatch(dbReplyTopic(fetchReplyToTopicResponse.data));
            } 
            else {
              console.log("error here");
            }
          } catch (err) {}
          break;
        default:
          break;
      }
    } else if (showTopicReplyButton === true) {
      switch (type) {
        case "REPLYTOTOPIC":
          try {
      
            const replyTopicRequest = await fetch(`/api/replytotopic/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
               // credentials : "include",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ TopicResponse: replyTopic }),
            });

            if (replyTopicRequest.status === 200) {
              toast.success("You successfully reply to this topic");
              const fetchReplyToTopic = await fetch(`/api/gettopicreply/${id}`,{
                  method: "POST",
                }
              );
              const fetchReplyToTopicResponse = await fetchReplyToTopic.json();
              dispatch(dbReplyTopic(fetchReplyToTopicResponse.data));
            }
            else if (replyTopicRequest.status === 400) {
              toast.error("Please login or register to perform this action");
            }
          } catch (error) {}
            break;

        default:
          break;
      }
    }
  };
  if (!showTopicReplyButton) {
    return (
      <div onClick={() => ReplyToTopicOrAddComment("GETTOPICANDCOMMENT")}  className={className}>
        {children}
      </div>
    );
  } else {
    return (
      <div>
        <CustomButtonComponent
          onClick={() => ReplyToTopicOrAddComment("REPLYTOTOPIC")} 
        >
          {children}
        </CustomButtonComponent>
      </div>
    );
  }
};

export default TopicReplyButtonComponent;

// I am chaining the replyto topic and fetch topic and comments button togehter here...This is to make the code readable and easy editing


