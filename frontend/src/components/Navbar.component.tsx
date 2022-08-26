import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { loginState } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
/*interface INAVITEM {
  LOGO: string;
  LOGIN: string;
  REGISTER: string;
  TOGGLEBUTTON: string;
}
*/

const navItemsA = [
  { name: "HOME", path: "/", id: 1 },
  { name: "LOGIN", path: "/login", id: 2 },
  { name: "REGISTER", path: "/register", id: 3 },
  { name: "CREATE TOPIC", path: "/newtopic", id: 4 },
];
const navItemsB = [
  { name: "HOME", path: "/", id: 1 },
  { name: "LOGOUT", path: "", id: 2 },
  { name: "CREATE TOPIC", path: "/newtopic", id: 3 },
];

const NavBarComponent = () => {
  const { loginSuccessful } = useAppSelector((state) => state.topic);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem("item");

  useEffect(() => {});
  //const renderNavbar = useCallback(() => {
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
      /// if (!sessionId) {
      // dispatch(loginState(false));
      // navigate("/login");
      //  toast.success("You are logged out");
      //}

      if (logUserOut.status === 200) {
        localStorage.removeItem('item')
       //toast.success("You are logged out");
        //dispatch(loginState(false));
       // navigate("/login");
      } else {
        toast.error("Logout impossible at this time");
      }
    }
  };
  return (
    <>
      {!sessionId ? (
        <Container>
          {navItemsA.map(({ name, path, id }) => (
            <ul key={id}>
              <Link to={path}>
                <li>{name}</li>
              </Link>
            </ul>
          ))}
        </Container>
      ) : (
        <Container>
          {navItemsB.map(({ name, path, id }) => (
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


/*
 @media screen and (max-width:820px){
      grid-template-columns: repeat(3, 1fr);
        width: 85%;
  }


*/