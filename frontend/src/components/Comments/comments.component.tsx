import React from "react";
import styled from "styled-components";
import { replyToTopic } from "../../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IComment, ITopic } from "../../types/type";
import { convertDate } from "../../utils/date";
import CardComponent from "../Card.component";
import TextFieldComponent from "../TextField.component";
import TopicReplyButtonComponent from "../TopicReplyButton.component";
import PaperBackgroundComponent from "./PaperBackground.component";

const CommentComponent = () => {
  const { databaseReplyTopic } = useAppSelector((state) => state.topic);
  const { replyTopic } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const userPin = sessionUser.id;
  const handleReplyChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    dispatch(replyToTopic(e.target.value));
  };

  if (databaseReplyTopic) {
    const { topic, comments, createdAt, author, username, _id } =
      databaseReplyTopic as ITopic;
    const topicID = _id;
    return (
      <div>
        <CardComponent
          id={topicID}
          topic={topic}
          username={author?.username ? author.username : ""}
          timestamp={`${convertDate(createdAt)} ago`}
          remove={userPin === author?._id ? "Delete" : ""}
          reply={userPin === author?._id ? "Edit" : ""}
          showTopicDeleteButton={true}
          showTopicReplyButton={false}
          topicOwner={username}
          showTopicEditButton={true}
          isVoteOnTopic={true}
          image={author?.avatar}
          className={"homepage_paperbackground"}
         
        />

        {comments && comments.length > 0 ? (
          comments.map(({ _id, reply, votes, author }: IComment, index) => (
            <CommentContainer key={index} style={{ marginTop: "1rem" }}>
              <CardComponent
                id={_id}
                topic={reply}
                username={author?.username}
                remove={userPin === author?._id ? "Delete" : ""}
                timestamp={`${convertDate(createdAt)} ago`}
                showTopicDeleteButton={false}
                topicCommentID={topicID}
                showTopicReplyButton={false}
                topicOwner={author?.username}
                showTopicEditButton={false}
                isVoteOnTopic={false}
                image={author?.avatar}
                className={"homepage_paperbackground"}
              />
            </CommentContainer>
          ))
        ) : (
          <>
            <PaperBackgroundComponent className="homepage_paperbackground">
              <h4>
                No comments yet on this post. Be the first person to leave a
                comment.
              </h4>
            </PaperBackgroundComponent>
          </>
        )}

        <TextFieldComponent
          type="text"
          value={replyTopic}
          onChange={handleReplyChange}
        >
          <TopicReplyButtonComponent id={_id} showTopicReplyButton={true}>
            SEND
          </TopicReplyButtonComponent>
        </TextFieldComponent>
      </div>
    );
  }

  return (
    //<CardComponent show style={{ textAlign: "center" }} id={"index"}>
    <h4>No reply yet on this post. Be the first to comment</h4>
    //  </CardComponent>
  );
};

export default CommentComponent;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
`;
// <h6>{`comments ${comments.length}`}</h6>
