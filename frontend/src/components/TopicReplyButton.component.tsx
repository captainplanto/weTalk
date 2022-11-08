import { FC } from "react";
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

  const ReplyToTopicOrAddComment = async (type: "REPLY" | "POST-REPLY") => {
      localStorage.setItem("TID", JSON.stringify(id));
    if (showTopicReplyButton === false) {
      switch (type) {
        case "REPLY":
          try {
            const fetchTopicAndComment = await fetch(
              `/api/reply/to/topic/${id}`,
              { method: "GET" }
            );
            if (fetchTopicAndComment.status === 200) {
              navigate("/topiccomment");
              const fetchReplyToTopicResponse =
                await fetchTopicAndComment.json();
              dispatch(dbReplyTopic(fetchReplyToTopicResponse.data));
            } else {
              console.log("error here");
            }
          } catch (err) {}
          navigate("/topiccomment");
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "POST-REPLY":
          try {
            const replyTopicRequest = await fetch(`/api/reply/to/topic/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ TopicResponse: replyTopic }),
            });

            if (replyTopicRequest.status === 200) {
              toast.success("You successfully reply to this topic");
              const fetchReplyToTopic = await fetch(
                `/api/reply/to/topic/${id}`,
                {
                  method: "GET",
                }
              );
              const fetchReplyToTopicResponse = await fetchReplyToTopic.json();
              dispatch(dbReplyTopic(fetchReplyToTopicResponse.data));
            } else if (replyTopicRequest.status === 400) {
              toast.error("Please login or register to perform this action");
            }
          } catch (error) {}
          break;

        default:
          break;
      }
    }
  };

  if (showTopicReplyButton) {
    return (
      <div>
        <CustomButtonComponent
          onClick={() => ReplyToTopicOrAddComment("POST-REPLY")}
        >
          {children}
        </CustomButtonComponent>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => ReplyToTopicOrAddComment("REPLY")}
        className={className}
      >
        {children}
      </div>
    );
  }
};

export default TopicReplyButtonComponent;

// I am chaining the replyto topic and fetch topic and comments button togehter here...This is to make the code readable and easy editing
