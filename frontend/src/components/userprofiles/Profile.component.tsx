import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AvaterComponent from "../Avater.component";
import { userProfileInfo } from "../../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser } from "../../types/type";
import { convertDate } from "../../utils/date";
import PaperBackgroundComponent from "../Comments/PaperBackground.component";
import TabComponent from "../Tabs.component";
import ProfileTopicComponent from "./ProfileTopic.component";
import ProfileLikesComponent from "./ProfileLikes.component";
import ProfileCommentComponent from "./ProfileComment.component";
import { setUsernameClicked } from "../../redux/features/userprofile";
import { UploadImageComponent } from "./UploadImage.component";

const ProfileComponent = () => {
  const { userProfile } = useAppSelector((state) => state.topic);
  const { currentTab } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const sessionid = localStorage.getItem("item");
  const sessionUser = sessionid ? JSON.parse(sessionid) : "";
  const currentUser = sessionUser.username;
  const [image, setImage] = useState<any>();
  const [renderImage, setRenderImage] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetch(`/api/userprofile/${sessionUser.username}`, {
        method: "GET",
      });
      const userResponse = await userInfo.json();
      dispatch(userProfileInfo(userResponse.data));
    };
    const itemInStorage = localStorage.getItem("state");
    const getItemInStorage = itemInStorage ? JSON.parse(itemInStorage) : "";
    if (getItemInStorage === true) {
      dispatch(setUsernameClicked(true));
    } else {
      dispatch(setUsernameClicked(false));
    }
    getUser();
  }, []);

  if (userProfile) {
    const { firstName, lastName, username, dob, email, createdAt, avatar } =
      userProfile as IUser;
    return (
      <ProfileContainer>
        <div>
          <UploadImageComponent username={username} />

          {renderImage ? (
            <>
              <AvaterComponent src={image && image} username={username} />
              <h5>Failed to upload</h5>
            </>
          ) : (
            <AvaterComponent src={avatar} username={username} />
          )}
          <ul>
            <li>{`${firstName} ${lastName}`}</li>
            <li style={{ color: "var(--main-blue)" }}>@{username}</li>
            <li>{`Born ${dob}`}</li>
            <li>{email}</li>
            <li>Joined {createdAt ? convertDate(createdAt) : ""} ago</li>
          </ul>
        </div>
        <div>
          <TabComponent />
          {currentTab === 1 ? (
            <ProfileTopicComponent />
          ) : currentTab === 2 ? (
            <ProfileCommentComponent />
          ) : currentTab === 3 ? (
            <ProfileLikesComponent />
          ) : (
            <ProfileTopicComponent />
          )}
        </div>
        <PaperBackgroundComponent className="profile_paper">
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
          <h6> Anthony Awoniyi </h6>
        </PaperBackgroundComponent>
      </ProfileContainer>
    );
  }
  return <h3>No profile info yet</h3>;
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
    margin-top: 8rem;
  }
  .profile_paper {
    max-height: 30rem;
    @media screen and (max-width: 820px) {
      display: none;
    }
  }
`;
