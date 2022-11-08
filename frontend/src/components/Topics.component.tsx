import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { dbTopics } from "../redux/features/topics";
import { ITopic } from "../types/type";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CardComponent from "./Card.component";
import { convertDate } from "../utils/date";
import PaperBackgroundComponent from "./PaperBackground.component";
import { useSession } from "../pages/hooks/useSession";

const TopicsComponent = () => {
  const { databaseTopics } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
   const {session}= useSession();
  useEffect(() => {
    try {
      const data = async () => {
        const fetchTopic = await fetch("/api/get/topic", {
          method: "GET",
        });
        const fetchTopicResponse = await fetchTopic.json();
        dispatch(dbTopics(fetchTopicResponse.data));
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
                  username={author?.username}
                  remove={session && session._id === author?._id ? "Delete" : ""}
                  reply="Reply"
                  edit={session && session._id === author?._id ? "Edit" : ""}
                  topic={topic}
                  timestamp={`${convertDate(createdAt)} ago`}
                  id={_id}
                  showTopicDeleteButton={true}
                  showTopicReplyButton={false}
                  topicOwner={author?.username}
                  showTopicEditButton={true}
                  image={author.avatar}
                  userId={author._id}
                  isVoteOnTopic={true}
                  className={"homepage_paperbackground"}
                />
              </div>
            )
          )
        ) : (
          <h5 className="color">
            <PaperBackgroundComponent style={no_post}>
              <h4>No post created yet. Be the first to create a post.</h4>
            </PaperBackgroundComponent>
          </h5>
        )}
      </OuterContainer>
    );
  }, [databaseTopics, session]);

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
const no_post = {
  width: "20%",
  color: "var(--moderate-blue)",
  textAlign: "center",
};
