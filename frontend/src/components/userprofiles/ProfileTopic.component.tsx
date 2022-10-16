import { FC } from "react";
import styled from "styled-components";
import { ITopic } from "../../types/type";
import { convertDate } from "../../utils/date";
import CardComponent from "../Card.component";
//import PaperBackgroundComponent from "../Comments/PaperBackground.component";

interface IClickProfile {
  clickedUserTopics?: ITopic[];
  topicsLikedByClickedUser?: ITopic[];
  topicsCommentedOnByClickedUser?: ITopic[];
}

const ProfileTopicComponent: FC<IClickProfile> = ({
  clickedUserTopics,
  topicsCommentedOnByClickedUser,
  topicsLikedByClickedUser,
}) => {
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser = sessionUser.username;

  return (
    <Container>
      {clickedUserTopics && clickedUserTopics.length > 0
        ? clickedUserTopics.map((
              { topic, _id, createdAt, author, username }: ITopic,
              index: number
            ) => (
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
                  userId={author?._id}
                />
              </div>
            )
          )
        : topicsLikedByClickedUser && topicsLikedByClickedUser.length > 0
        ? topicsLikedByClickedUser.map((
              { topic, _id, createdAt, author, username }: ITopic,
              index: number
            ) => (
              <div key={index} className="all-posts">
                <CardComponent
                  username={author[0].username}
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
                  image={author[0].avatar}
                  isVoteOnTopic={true}
                  userId={author?._id}
                />
              </div>
            )
          )
        : ""}
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

/*


   <PaperBackgroundComponent>
          <h5 className="color">No post created yet by users.</h5>
        </PaperBackgroundComponent>


*/
