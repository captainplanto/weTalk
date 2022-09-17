import React, { useEffect } from "react";
import styled from "styled-components";
import { setTopicsByUser } from "../../redux/features/userprofile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ITopic } from "../../types/type";
import { convertDate } from "../../utils/date";
import CardComponent from "../Card.component";
import PaperBackgroundComponent from "../Comments/PaperBackground.component";

const ProfileTopicComponent = () => {
  const { topicsByUser } = useAppSelector((state) => state.profile);
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser = sessionUser.username;
  const dispatch = useAppDispatch();
 /* useEffect(() => {
    const get = async () => {
      const userTopic = await fetch("/api/user/topics", {
        method: "GET",
      });

      const { data } = await userTopic.json();
      dispatch(setTopicsByUser(data));
    };
    get();
  }, []);
*/
  return (
    <Container>
      {topicsByUser && topicsByUser.length > 0 ? (
        topicsByUser.map(
          ({ topic, _id, createdAt, author, username }: ITopic, index) => (
            <div key={index} className="all-posts">
              <CardComponent
                username={author?.username}
                remove={currentUser === author?._id ? "Delete" : ""}
                reply={"Reply"}
                edit={currentUser === author?._id ? "Edit" : ""}
                topic={topic}
                timestamp={`${convertDate(createdAt)} ago`}
                id={_id}
                showTopicDeleteButton={true}
                showTopicReplyButton={false}
                topicOwner={author?.username}
                showTopicEditButton={true}
                image={author?.avatar}
                isVoteOnTopic={true}
              />
            </div>
          )
        )
      ) : (
        <PaperBackgroundComponent>
          <h5 className="color">No post created yet by user.</h5>
        </PaperBackgroundComponent>
      )}
    </Container>
  );
};

export default ProfileTopicComponent;
const Container = styled.div`
  margin-top: 6rem;
  .all-posts {
    margin-bottom: 2rem;
  }
  .color {
    color: var(--moderate-blue);
  }
`;
