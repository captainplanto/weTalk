import React, { FC,  ReactNode,  useState } from "react";
import styled from "styled-components";
import AvaterComponent from "./Avater.component";
import VoteComponent from "./Vote.component";
import { createTopic } from "../redux/features/topics";
import { useAppDispatch} from "../redux/hooks";
import TopicDeleteButtonComponent from "./Comments/TopicDeleteButton.component";
import PaperBackgroundComponent from "./Comments/PaperBackground.component";
import { Schema } from "mongoose";
import TextFieldComponent from "./TextField.component";
import TopicEditedButtonComponent from "./TopicEditedButton.component";
import TopicReplyButtonComponent from "./TopicReplyButton.component";
import DropdownComponent from "./Dropdown.Component";
import { Dropdown } from "@nextui-org/react";
import icon from "../publics/menu-vertical.png";
import UserNameClickHandler from "./UsernameClick.component";



interface ICard {
  avatar?: string;
  username?: any;
  timestamp?: string;
  reply?: string;
  edit?: string;
  style?: object;
  remove?: string;
  topic?: string;
  show?: boolean;
  render?: boolean;
  id: Schema.Types.ObjectId;
  image?: string;
  className?: string;
  topicCommentID?: any;
  showTopicReplyButton: boolean;
  showTopicDeleteButton: boolean;
  showTopicEditButton: boolean;
  topicOwner?: string;
  isVoteOnTopic: boolean;
  paperBackground?: string;
  userId?:any;
}

const CardComponent: FC<ICard> = ({
  avatar,
  username,
  timestamp,
  reply,
  edit,
  style,
  remove,
  topic,
  show,
  image,
  className,
  showTopicDeleteButton,
  showTopicReplyButton,
  showTopicEditButton,
  topicCommentID,
  id,
   userId,
  topicOwner,
  isVoteOnTopic,
  paperBackground,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser = sessionUser.username;
  const [openUpdateTextBox, setopenUpdateTextBox] = useState(true);
  const handleTextBoxOpen = () => {
    if (currentUser === topicOwner) {
      setopenUpdateTextBox(!openUpdateTextBox);
    } else {
      console.log("not your own");
    }
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    dispatch(createTopic(e.target.value));
  };

  return (
    <>
      <PaperBackgroundComponent className={className}>
        <CardContainer
          style={{
            gridTemplateColumns:
              window.innerWidth <= 500 ? "repeat(5, 1fr)" : "",
            gridColumnGap: window.innerWidth <= 500 ? "8px" : "",
          }}
        >
          {!show && (
            <div className="vote_component">
              <VoteComponent id={id} isVoteOnTopic={isVoteOnTopic} />
            </div>
          )}
          {!show && (
            <div className="avater_component">
              <AvaterComponent
                username={username}
                src={image ? image : ""}
                id={id}
              />
            </div>
          )}

          <div className="username">
            <UserNameClickHandler _id={ userId  ? userId : ''}>{username}</UserNameClickHandler>
          </div>

          <div className="timestamp">{timestamp}</div>

          {window.innerWidth <= 500 ? (
            <DropdownComponent showContent={icon}>
              <Dropdown.Item>
                <TopicDeleteButtonComponent
                  id={id}
                  showTopicDeleteButton={showTopicDeleteButton}
                  topicCommentID={topicCommentID ? topicCommentID : ""}
                  topicOwner={topicOwner ? topicOwner : ""}
                >
                  {remove}
                </TopicDeleteButtonComponent>
              </Dropdown.Item>

              <Dropdown.Item>
                <TopicReplyButtonComponent
                  id={id}
                  showTopicReplyButton={showTopicReplyButton}
                >
                  {reply}
                </TopicReplyButtonComponent>
              </Dropdown.Item>

              <Dropdown.Item>
                <div onClick={handleTextBoxOpen}>{edit}</div>
              </Dropdown.Item>
            </DropdownComponent>
          ) : (
            <>
              <TopicDeleteButtonComponent
                className="remove"
                id={id}
                showTopicDeleteButton={showTopicDeleteButton}
                topicCommentID={topicCommentID ? topicCommentID : ""}
                topicOwner={topicOwner ? topicOwner : ""}
              >
                {remove}
              </TopicDeleteButtonComponent>

              <TopicReplyButtonComponent
                id={id}
                showTopicReplyButton={showTopicReplyButton}
                className="edit"
              >
                {reply}
              </TopicReplyButtonComponent>

              <div onClick={handleTextBoxOpen} className="reply">
                {edit}
              </div>
            </>
          )}

          <div className="comment">{topic}</div>
        </CardContainer>

        {!openUpdateTextBox ? (
          <TextFieldComponent
            type="text"
            defaultValue={topic}
            onChange={handleChange}
          >
            {showTopicEditButton ? (
              <TopicEditedButtonComponent
                id={id}
                showTopicEditButton={showTopicEditButton}
                topicOwner={topicOwner ? topicOwner : ""}
              >
                UPDATE TOPIC
              </TopicEditedButtonComponent>
            ) : (
              <TopicEditedButtonComponent
                id={id}
                showTopicEditButton={showTopicEditButton}
                topicCommentID={topicCommentID ? topicCommentID : ""}
                topicOwner={topicOwner ? topicOwner : ""}
              >
                UPDATE COMMENT
              </TopicEditedButtonComponent>
            )}
          </TextFieldComponent>
        ) : (
          ""
        )}
      </PaperBackgroundComponent>
    </>
  );
};

export default CardComponent;

const CardContainer = styled.div<{ show?: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 12px;
  grid-row-gap: 6px;
  .vote_component {
    grid-area: 1 / 1 / 3 / 2;
  }

  .avater_component {
    grid-area: 1 / 2 / 2 / 3;
  }

  .username {
    grid-area: 1 / 3 / 2 /4;
  }

  .timestamp {
    grid-area: 1 / 4 / 2 / 5;
  }

  .remove {
    grid-area: 1 / 7 / 2 / 6;
  }
  .edit {
    grid-area: 1 / 8 / 2 / 7;
  }

  .reply {
    grid-area: 1 / 9 / 2 / 8;
    padding-left: 2rem;
  }
  .comment {
    grid-area: 2 / 2 / 3 / 8;
  }

  .remove,
  .edit,
  .reply {
    color: var(--moderate-blue);
    font-weight: 700;
    :hover {
      color: var(--light-grayish-blue);
      cursor: pointer;
    }
  }
  .username,
  .timestamp {
    font-weight: 700;
  }
  .username {
    :hover {
      cursor: pointer;
    }
  }
`;
