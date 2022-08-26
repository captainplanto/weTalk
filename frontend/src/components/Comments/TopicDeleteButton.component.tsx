import { Schema } from "mongoose";
import React, { FC, ReactNode } from "react";
import { toast } from "react-toastify";
import {
  dbReplyTopic,
  dbTopics,

} from "../../redux/features/topics";
import { useAppDispatch } from "../../redux/hooks";

interface IDeleteButton {
  children: ReactNode;
  id: Schema.Types.ObjectId;
  className?: string;
  showTopicDeleteButton: boolean;
  topicCommentID?: any;
 topicOwner:string;
}
const TopicDeleteButtonComponent: FC<IDeleteButton> = ({
  children,
  id,
  className,
  topicCommentID,
  showTopicDeleteButton,
 topicOwner,
  ...props
}) => {
  const dispatch = useAppDispatch();

const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser = sessionUser.username;
  const deleteTopicOrComment = async (
    type: "DELETE_TOPIC" | "DELETE_COMMENT"
  ) => {
    if(currentUser === topicOwner){
    if (showTopicDeleteButton) {
      switch (type) {
        case "DELETE_TOPIC":
          try {
            const deleteTopicReq = await fetch(`/api/deletetopic/${id}`, {
              method: "DELETE",
            });
            if (deleteTopicReq.status === 200) {
              toast.success("Topic succesfully deleted");
              const fetchTopic = await fetch("/api/gettopic", {
                method: "GET",
              });
              const fetchTopicResponse = await fetchTopic.json();
              dispatch(dbTopics(fetchTopicResponse.data));
            }
            if (deleteTopicReq.status === 400) {
              toast.error(
                "Something went wrong, topic cannot be deleted this time"
              );
            }
          } catch (err) {
            //console.log(err);
          }
          break;

        default:
          break;
      }
    } else if (!showTopicDeleteButton) {
      switch (type) {
        case "DELETE_COMMENT":
          try {
            const deleteCommentReq = await fetch(`/api/deletecomment/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              // topicCommentID is the id of the topic we want to remove comment from
              body: JSON.stringify({ topicID: topicCommentID }),
            });
            if (deleteCommentReq.status === 200) {
                toast.success("comment succesfully deleted");
             const fetchCommentOnTopic = await fetch(`/api/gettopicreply/${topicCommentID}`,{
                  method: "POST",
                }
              );
              const fetchCommentOnTopicResponse = await fetchCommentOnTopic.json();
              dispatch(dbReplyTopic(fetchCommentOnTopicResponse.data));
            
            }
            if (deleteCommentReq.status === 400) {
              toast.error(
                "Something went wrong, comment cannot be deleted this time"
              );
            }
          } catch (err) {
            // console.log(err)
          }
          break;

        default:
          break;
      }
    }
       }else{
         console.log('You are not the creator of this topic')
       }
  };

  if (showTopicDeleteButton) {
    return (
      <div
        onClick={() => deleteTopicOrComment("DELETE_TOPIC")}
        className={className}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        onClick={() => deleteTopicOrComment("DELETE_COMMENT")}
        className={className}
      >
        {children}
      </div>
    );
  }
};

export default TopicDeleteButtonComponent;


//ShowTopicDeleteButton is a boolean that tells if the code should run for topic delete or comment delete.
//If showTopicDeleteButton is true, then, topic posted would be deleted. If ShowTopicDeleteButton is false, then the comments would be deleted in stead

/*


  const fetchTopic = await fetch(`/api/getreplytotopic/${id}`, {
                method: "GET",
              });
              const fetchTopicResponse = await fetchTopic.json();
              dispatch(replyToTopic(fetchTopicResponse.data));

*/

/*import { Schema } from "mongoose";
import React, { FC, ReactNode } from "react";
import { toast } from "react-toastify";
import { dbTopics } from "../../redux/features/topics";
import { useAppDispatch } from "../../redux/hooks";
//
interface IDeleteButton {
  children: ReactNode;
  id: Schema.Types.ObjectId;
  className: string;
}
const TopicDeleteButtonComponent: FC<IDeleteButton> = ({
  children,
  id,
  className,
}) => {
  const dispatch = useAppDispatch();
  const deleteTopic = (id: Schema.Types.ObjectId) => async () => {
    try {
      const deleteTopicReq = await fetch(`/api/deletetopic/${id}`, {
        method: "DELETE",
      });
      if (deleteTopicReq.status === 200) {
        toast.success("Topic succesfully deleted");
        const fetchTopic = await fetch("/api/gettopic", {
          method: "GET",
        });
        const fetchTopicResponse = await fetchTopic.json();
        dispatch(dbTopics(fetchTopicResponse.data));
      }
      if (deleteTopicReq.status === 400) {
        toast.error("Something went wrong, topic cannot be deleted this time");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onClick={deleteTopic(id)} className={className}>
      {children}
    </div>
  );
};

export default TopicDeleteButtonComponent;


*/
