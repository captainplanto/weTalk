import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  mobileNavBarNoSession,
  mobileNavBarSession,
  noSessionNavBar,
  sessionNavBar,
} from "../constant/consts";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMobileSearchBar } from "../redux/features/topics";
import { ReactNode } from "react";

const NavBarComponent = () => {
  const sessionId = localStorage.getItem("item");
  const { mobileSearchBar } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();

  const displayMobileSearchBar = () => {
    dispatch(setMobileSearchBar(!mobileSearchBar));
    localStorage.setItem('mobileSearchBox', JSON.stringify(mobileSearchBar))
  };

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

  const handleLogOutAndSearch = (id: number, name: string|ReactNode) => {
    if (id === 2 && name === "SEARCH") {
      return displayMobileSearchBar();
    } else if (id === 3 && name === "LOGOUT") {
      handleLogOut();
    }
  };
  if (window.innerWidth > 500) {
    return sessionId ? (
      <Container>
        {sessionNavBar.map(({ name, path, id }) => (
          <ul key={id}>
            <Link to={path}>
              <li onClick={() => handleLogOutAndSearch(id, name)}>{name}</li>
            </Link>
          </ul>
        ))}
      </Container>
    ) : (
      <Container>
        {noSessionNavBar.map(({ name, path, id }) => (
          <ul key={id}>
            <Link to={path}>
              <li>{name}</li>
            </Link>
          </ul>
        ))}
      </Container>
    );
  } else {
    return sessionId ? (
      <MobileContainer>
        <div className="sessionCss">
          {mobileNavBarSession.map(({ name, path, id, icon }) => (
            <ul key={id}>
              <Link to={path}>
                <li onClick={() => handleLogOutAndSearch(id, name)}>{icon}</li>
                <p>{name}</p>
              </Link>
            </ul>
          ))}
        </div>
        <Link to="/newtopic">
          <div className="container">
            <div className="create_topic_mobile">
              <CreateRoundedIcon />
            </div>
          </div>
        </Link>
      </MobileContainer>
    ) : (
      <MobileContainer>
        <div className="noSessionCss">
          {mobileNavBarNoSession.map(({ name, path, id, icon }) => (
            <ul key={id}>
              <Link to={path}>
                <li onClick={() => handleLogOutAndSearch(id, name)}>{icon}</li>
                <p>{name}</p>
              </Link>
            </ul>
          ))}
        </div>
      </MobileContainer>
    );
  }
};
export default NavBarComponent;
const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 4fr repeat(2, 0.7fr);
  grid-column-gap: 15px;
  grid-row-gap: 0px;
  margin-top:2rem;
`;

const MobileContainer = styled.div`
  background: var(--light-grayish-blue);
  z-index: 1000;
  bottom: 0;
  position: fixed;
  width: 100%;
  padding: 1rem;
  text-align: center;
  .sessionCss {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .noSessionCss {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .container {
    display: flex;
    justify-content: flex-end;
  }
  .create_topic_mobile {
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 5rem;
    position: fixed;
    bottom: 10rem;
    background-color: var(--moderate-blue);
  }
`;
