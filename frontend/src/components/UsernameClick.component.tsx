import { Link} from "react-router-dom";
import { FC, ReactNode } from "react";
import { Schema } from "mongoose";

interface IuserName {
  children: ReactNode;
  _id: Schema.Types.ObjectId;
}
const UserNameClickHandler: FC<IuserName> = ({ children, _id }) => {
  return <Link to={`/profile/${_id}`}>{children}</Link>;
};
export default UserNameClickHandler;
