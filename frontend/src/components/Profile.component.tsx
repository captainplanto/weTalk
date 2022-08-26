import { Schema } from "mongoose";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import AvaterComponent from "../components/Avater.component";
import CustomButtonComponent from "../components/CustomButton.component";
import ImageUploadComponent from "../components/ImageUpload.component";
import { userProfileInfo } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IUser } from "../types/type";

import { convertDate } from "../utils/date";

const ProfileComponent = () => {
  const { userProfile } = useAppSelector((state) => state.topic);
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
      const { firstName, lastName, username, dob, email, createdAt, _id, avatar } =
    userProfile as IUser;
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
            <AvaterComponent src={image && image} />
            <h5>Failed to upload</h5>
          </>
        ) : (
          <AvaterComponent src={avatar} />
        )}
        <ul>
          <li>{`${firstName} ${lastName}`}</li>
          <li style={{ color: "var(--main-blue)" }}>@{username}</li>
          <li>{`Born ${dob}`}</li>
          <li>{email}</li>
          <li>Joined {createdAt ? convertDate(createdAt) : ""} ago</li>
        </ul>
        </div>
      </ProfileContainer>
    );
  }
  return <h3>No profile info yet</h3>;
};

export default ProfileComponent;
const ProfileContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 39px;
  grid-row-gap: 0px;
`;
