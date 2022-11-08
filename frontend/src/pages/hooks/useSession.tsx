import { useEffect, useState } from "react";
import { IUser } from "../../types/type";

export const useSession = () => {
const [session, setSession] = useState<IUser>();

  useEffect(() => {
    const getItems = localStorage.getItem("item");
    const userInSession = getItems ? JSON.parse(getItems) : {};
    setSession(userInSession);
  }, []);

  return { session } as const;
};
