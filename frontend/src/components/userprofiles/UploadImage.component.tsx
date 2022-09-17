import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";
import { IUser } from "../../types/type";
import CustomButtonComponent from "../CustomButton.component";
import UploadInputComponent from "../UploadInput.component";

export const UploadImageComponent = ({ username }: Pick<IUser, "username">) => {
  const [image, setImage] = useState<any>();
  const [renderImage, setRenderImage] = useState<boolean>(false);
  const { usernameClicked } = useAppSelector((state) => state.profile);
  const sessionid = localStorage.getItem("item");
  const sessionUser = sessionid ? JSON.parse(sessionid) : "";
  const currentUser = sessionUser.username;
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

      if (profileImage.status === 200) {
        toast.success("profile picture successfully uploaded");
        setRenderImage(true);
      }
    } catch (error) {
      console.log(error, "error here");
    }
  };

  return (
    <div>
      {usernameClicked === true ? (
        <>
          <UploadInputComponent
            type="file"
            name="image"
            onChange={handleChange}
          />

          <CustomButtonComponent onClick={handleSubmit()}>
            Upload Image
          </CustomButtonComponent>
          <h4>Welcome back {username}</h4>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
