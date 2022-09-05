import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { loginState } from "../redux/features/topics";
import { useAppDispatch } from "../redux/hooks";

const noSessionNavBar = [
  { name: "HOME", path: "/", id: 1 },
  { name: "LOGIN", path: "/login", id: 2 },
  { name: "REGISTER", path: "/register", id: 3 },
  //{ name: "CREATE TOPIC", path: "/newtopic", id: 4 },
];
const sessionNavBar = [
  { name: "HOME", path: "/", id: 1 },
  { name: "LOGOUT", path: "", id: 2 },
  { name: "CREATE TOPIC", path: "/newtopic", id: 3 },
];

const NavBarComponent = () => {
  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem("item");
  const handleLogOut = async (id: number) => {
    if (id === 2) {
      dispatch(loginState(false));
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
      } else {
        toast.error("Logout impossible at this time");
      }
    }
  };
  return (
    <>
      {!sessionId ? (
        <Container>
          {noSessionNavBar.map(({ name, path, id }) => (
            <ul key={id}>
              <Link to={path}>
                <li>{name}</li>
              </Link>
            </ul>
          ))}
        </Container>
      ) : (
        <Container>
          {sessionNavBar.map(({ name, path, id }) => (
            <ul key={id}>
              <Link to={path}>
                <li onClick={() => handleLogOut(id)}>{name}</li>
              </Link>
            </ul>
          ))}
        </Container>
      )}
    </>
  );
};

export default NavBarComponent;
const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 9fr repeat(3, 0.7fr);

  grid-column-gap: 15px;
  grid-row-gap: 0px;
`;
