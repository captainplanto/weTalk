import { useNavigate } from "react-router-dom";
import { FC, ReactNode } from "react";
import { Schema } from "mongoose";

interface IuserName {
  children: ReactNode;
  _id:Schema.Types.ObjectId;
}
const UserNameClickHandler: FC<IuserName> = ({ children, _id}) => {
  const navigate = useNavigate();

  const onUserNameClick = async (_id:Schema.Types.ObjectId) => {
    localStorage.setItem("usernameClicked", JSON.stringify(_id));
    navigate("/profile");
  };

  return <div onClick={()=>onUserNameClick(_id)}>{children}</div>;
};
export default UserNameClickHandler;
