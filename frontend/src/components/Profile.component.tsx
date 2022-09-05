import { Schema } from "mongoose";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import AvaterComponent from "../components/Avater.component";
import CustomButtonComponent from "../components/CustomButton.component";
import ImageUploadComponent from "../components/ImageUpload.component";
import { userProfileInfo } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ITopic, IUser } from "../types/type";

import { convertDate } from "../utils/date";
import CardComponent from "./Card.component";
import PaperBackgroundComponent from "./Comments/PaperBackground.component";

const ProfileComponent = () => {
  const { userProfile } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const sessionid = localStorage.getItem("item");
  const sessionUser = sessionid ? JSON.parse(sessionid) : "";
  const currentUser = sessionUser.username;
  const [image, setImage] = useState<any>();
  const [renderImage, setRenderImage] = useState<boolean>(false);
  const { databaseTopics } = useAppSelector((state) => state.topic);
  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetch(`/api/userprofile/${sessionUser.username}`, {
        method: "GET",
      });
      const userResponse = await userInfo.json();
      dispatch(userProfileInfo(userResponse.data));
    };
    getUser();
  }, []);

  const previewFiles = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      previewFiles(file);
    }
  };
  const handleSubmit = () => async (e: any) => {
    e.preventDefault();
    try {
      const profileImage = await fetch(
        `/api/upload/profile/image/${currentUser}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profileImage: image }),
        }
      );
      // const { message, success, data } = await profileImage.json();
      if (profileImage.status === 200) {
        toast.success("profile picture successfully uploaded");
        setRenderImage(true);
      }
    } catch (error) {
      console.log(error, "error here");
    }
  };

  if (userProfile) {
    const {
      firstName,
      lastName,
      username,
      dob,
      email,
      createdAt,
      _id,
      avatar,
    } = userProfile as IUser;
    return (
      <ProfileContainer>
        <div>
          <>
            <ImageUploadComponent
              type="file"
              name="image"
              onChange={handleChange}
            />

            <CustomButtonComponent onClick={handleSubmit()}>
              Upload Image
            </CustomButtonComponent>
          </>
          <h4>Welcome back {username}</h4>
          {renderImage ? (
            <>
              <AvaterComponent src={image && image} username={username} />
              <h5>Failed to upload</h5>
            </>
          ) : (
            <AvaterComponent src={avatar}username={username}  />
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
          {databaseTopics && databaseTopics.length > 0 ? (
            databaseTopics.map(
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
            <h5 className="color">
              No post created yet. Please create new post.
            </h5>
          )}
        </div>
        <PaperBackgroundComponent className="profile_paper">
          <h1> Anthony Awoniyi </h1>
          <h1> Anthony Awoniyi </h1>
          <h1> Anthony Awoniyi </h1>
          <h1> Anthony Awoniyi </h1>
          <h1> Anthony Awoniyi </h1>
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
  grid-template-columns: 1fr 2.5fr 2fr;

  grid-column-gap: 1rem;
  grid-row-gap: 0px;
  .profile_paper {
    padding: 4rem;
    width: 65%;
  }
`;
