import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { dbTopics } from "../redux/features/topics";
import { ITopic } from "../types/type";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CardComponent from "./Card.component";
import { convertDate } from "../utils/date";

const TopicsComponent = () => {
  const { databaseTopics } = useAppSelector((state) => state.topic);

  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser = sessionUser.id;
  useEffect(() => {
    try {
      const data = async () => {
        const fetchComment = await fetch("/api/gettopic", {
          method: "GET",
        });
        const fetchCommentResponse = await fetchComment.json();
        dispatch(dbTopics(fetchCommentResponse.data));
      };
      data();
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const topicLists = useCallback(() => {
    return (
      <OuterContainer>
        {databaseTopics && databaseTopics.length > 0 ? (
          databaseTopics.map(
            ({ topic, _id, createdAt, author, username }: ITopic, index) => (
              <div key={index} className="all-posts">
                <CardComponent
                  username= {author?.username}
                  remove={currentUser === author?._id ? "Delete" : ""}
                  reply={"Reply"}
                  edit={currentUser === author?._id ? "Edit" : ""}
                  topic={topic}
                  timestamp={`${convertDate(createdAt)} ago`}
                  id={_id}
                  showTopicDeleteButton={true}
                  showTopicReplyButton={false}
                  topicOwner={author?.username} showTopicEditButton={true}    
                  image={author?.avatar} />
                
               
              </div>
            )
          )
        ) : (
          <h5 className="color">
            No post created yet. Please create new post.
          </h5>
        )}
      </OuterContainer>
    );
  }, [currentUser, databaseTopics]);

  return <>{topicLists()}</>;
};

export default TopicsComponent;

const OuterContainer = styled.div`
  margin-top: 5rem;
  .color {
    color: white;
  }

  .all-posts {
    margin-bottom: 1rem;
    button {
      outline: none;
      border: none;
      :hover {
        cursor: pointer;
      }
    }
  }
  .more-post-btn {
    display: flex;
    margin: 0 auto;
  }
`;


