import { useNavigate } from "react-router-dom";
import { setTopicsByUser } from "../redux/features/userprofile";
import { useAppDispatch } from "../redux/hooks";
import { FC, ReactNode,  useState } from "react";
interface IuserName {
  children: ReactNode;
}
const UserNameClickHandler: FC<IuserName> = ({ children }) => {
  const [userClick] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sessionid = localStorage.getItem("item");
  const sessionUser = sessionid ? JSON.parse(sessionid) : "";
  const currentUser = sessionUser.username;
 

  const onUserNameClick = async () => {
    if (currentUser === children) {
      localStorage.setItem("state", JSON.stringify(!userClick));
    } else if (currentUser !== children) {
      localStorage.setItem("state", JSON.stringify(userClick));
    }

    const userTopic = await fetch(`/api/user/topics/${children}`, {
      method: "GET",
    });
    if (userTopic.status === 200) {
      navigate("/profile");
      const { data } = await userTopic.json();
      dispatch(setTopicsByUser(data));
    }
    if (userTopic.status === 400) {
      navigate("/profile");
      const { data } = await userTopic.json();
      dispatch(setTopicsByUser(data));
    }
  };

  return <div onClick={onUserNameClick}>{children}</div>;
};
export default UserNameClickHandler;
