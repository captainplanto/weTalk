import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { convertDate } from "../../utils/date";
import TabComponent from "../Tabs.component";
import ProfileTopicComponent from "./ProfileTopic.component";
import ProfileCommentComponent from "./ProfileComment.component";
import { UploadImageComponent } from "./UploadImage.component";
import { Loading } from "@nextui-org/react";
import { IUser } from "../../types/type";
import { userProfileClickedInfo } from "../../redux/features/topics";
import { setTopicsLikedByUser } from "../../redux/features/userprofile";

import { LayOut } from "../layout/layout.component";
import { useParams } from "react-router-dom";

const ProfileComponent = () => {
  const { userProfileClicked } = useAppSelector((state) => state.topic);
  const { topicsLikedByUser } = useAppSelector((state) => state.profile);
  const { currentTab } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const {id}= useParams();
  useEffect(() => {
    const fetchUserClickObject = async () => {
      const userObject = await fetch(`/api/user/topics/${id}`, {
        method: "GET",
      });
      if (userObject.status === 200) {
        const { data } = await userObject.json();
        dispatch(userProfileClickedInfo(data));
      } else if (userObject.status === 400) {
        console.log("error fetching user-details from database");
      }

      const userLikesOnTopics = await fetch(
        `/api/user/topics/likes/${id}`,
        {
          method: "GET",
        }
      );
      const { message, success, data } = await userLikesOnTopics.json();
      if (userLikesOnTopics.status === 200) {
        dispatch(setTopicsLikedByUser(data));
      } else if (userLikesOnTopics.status === 400) {
        console.log(message, success);
      }

      const userCommentsOnTopics = await fetch(
        `/api/user/topics/comments/${id}`,
        {
          method: "GET",
        }
      );

      if (userCommentsOnTopics.status === 200) {
        const { message, success, data } = await userCommentsOnTopics.json();
        // dispatch(setTopicsLikedByUser(data))
      } else if (userLikesOnTopics.status === 400) {
        console.log(message, success);
      }
    };

    fetchUserClickObject();
  }, []);

  if (userProfileClicked) {
    const { username, avatar, firstName, lastName, dob, email, createdAt } =
      userProfileClicked as IUser;
    const { topics } = userProfileClicked as any;

    return (
      <>
       <LayOut>
        <ProfileContainer>
          <div>
            <UploadImageComponent username={username} avatar={avatar} />
            <ul>
              <li>{`${firstName} ${lastName}`}</li>
              <li style={{ color: "var(--main-blue)" }}>@{username}</li>
              <li>{`Born ${dob}`}</li>
              <div className="email_joined">
                <li>{email}</li>
                <li>Joined {createdAt ? convertDate(createdAt) : ""} ago</li>
              </div>
            </ul>
          </div>

          <div>
            <TabComponent />
            {currentTab === 1 ? (
              <ProfileTopicComponent clickedUserTopics={topics} />
            ) : currentTab === 2 ? (
              <ProfileCommentComponent />
            ) : currentTab === 3 ? (
              <ProfileTopicComponent
                topicsLikedByClickedUser={topicsLikedByUser}
              />
            ) : (
              <ProfileTopicComponent clickedUserTopics={topics} />
            )}
          </div>
          {/*<PaperBackgroundComponent className="profile_paper">
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
        </PaperBackgroundComponent>*/}
        </ProfileContainer>
        </LayOut>
      </>
    );
  }
  return <Loading type="points-opacity" size="xs" style={loadingStyle} />;
};

export default ProfileComponent;
const ProfileContainer = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
  grid-column-gap: 1rem;
  grid-row-gap: 0px;
  @media screen and (max-width: 820px) {
    display: block;
    margin-top: 2rem;

  ul {
    .email_joined {
      display: flex;
      justify-content: space-between;
    }
  }
    }
  .profile_paper {
    max-height: 30rem;
    @media screen and (max-width: 820px) {
      display: none;
    }
  }
`;

const loadingStyle = {
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  height: "100vh",
};
