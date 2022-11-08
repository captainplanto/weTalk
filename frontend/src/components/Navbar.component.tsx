import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CurrentUserImage, SearchBar } from "../constant/consts";
import { useSession } from "../pages/hooks/useSession";
import { INavOptions, NavComponent } from "./Nav/Nav.component";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import { setMobileSearchBar } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const NavBarComponent = () => {
  const { mobileSearchBar } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const { session } = useSession();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const logUserOut = await fetch("api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (logUserOut.status === 200) {
      localStorage.removeItem("item");
      toast.success("You are logged out");
    } else {
      toast.error("Logout impossible at this time");
    }
  };
  const NavItemsDesktop: INavOptions[] = session && session._id ? [
          { name: "HOME", id: 1, action:() => navigate("/")},
          { name: <SearchBar />, id: 2 },
          { name: "LOGOUT", id: 3, action: () => handleLogOut() },
          {
            name: "CREATE TOPIC",
            id: 4,
            action: () => navigate("/newtopic"),
          },
        ]
      : [
          { name: "HOME", id: 1, action: () => navigate("/") },
          { name: <SearchBar />, id: 2 },
          { name: "LOGIN", id: 3, action: () => navigate("/login") },
          { name: "REGISTER", id: 4, action: () => navigate("/register") },
        ];

  const NavItemsMobile: INavOptions[] =session && session._id ? [
          {
            name: "HOME",
            id: 1,
            icon: <HomeIcon />,
            action: () => navigate("/"),
          },
          {
            name: "SEARCH",
            id: 2,
            icon: <SearchIcon />,
            action: () => dispatch(setMobileSearchBar(!mobileSearchBar)),
          },
          {
            name: "LOGOUT",
            id: 3,
            icon: <LogoutIcon />,
            action: () => handleLogOut(),
          },
          {
            name: "PROFILE",
            id: 4,
            icon: <CurrentUserImage />,
            action: () => navigate("/profile"),
          },
        ]: [
          {
            name: "HOME",
            id: 1,
            icon: <HomeIcon />,
            action: () => navigate("/"),
          },
          {
            name: "SEARCH",
            id: 2,
            icon: <SearchIcon />,
            action: () => dispatch(setMobileSearchBar(!mobileSearchBar)),
          },
          {
            name: "LOGIN",
            id: 3,
            icon: <LoginIcon />,
            action: () => navigate("/login"),
          },
          {
            name: "REGISTER",
            id: 4,
            icon: <LockOpenIcon />,
            action: () => navigate("/register"),
          },
        ];

  return (
    <>
      <NavComponent option={NavItemsDesktop} showOnDesktop={true} />
      <NavComponent option={NavItemsMobile} showOnDesktop={false} />
    </>
  );
};

export default NavBarComponent;
