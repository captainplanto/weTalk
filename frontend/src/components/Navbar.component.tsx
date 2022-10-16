import React from "react";
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

const NavBarComponent = () => {
  const sessionId = localStorage.getItem("item");
  const handleLogOut = async (id: number) => {
    if (id === 2) {
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
    }
  };
  if (window.innerWidth > 500) {
    return sessionId ? (
      <Container>
        {sessionNavBar.map(({ name, path, id }) => (
          <ul key={id}>
            <Link to={path}>
              <li onClick={() => handleLogOut(id)}>{name}</li>
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
                <li onClick={() => handleLogOut(id)}>{icon}</li>
                 <p>{name}</p>
              </Link>
            </ul>
          ))}
        </div>
         <Link to='/newtopic'>
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
                <li>{icon}</li>
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
  grid-template-columns: 3.5fr 4fr  repeat(2, 0.7fr);
  grid-column-gap: 15px;
  grid-row-gap: 0px;
`;

const MobileContainer = styled.div`
  background: var(--light-grayish-blue);
  z-index: 1000;
  bottom: 0;
  position: fixed;
  width: 100%;
  padding: 1rem;
    text-align:center;
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
