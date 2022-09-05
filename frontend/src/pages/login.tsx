import { Loading } from "@nextui-org/react";
import React from "react";
import RegisterComponent from "../components/Register.component";
import { useAppSelector } from "../redux/hooks";

const LoginUser = () => {
  const { loginSuccessful } = useAppSelector((state) => state.topic);

  if (loginSuccessful === false) {
    return (
      <div>
        <RegisterComponent signIn={true} />
      </div>
    );
  }
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
      }}
    >
      <Loading type="points-opacity" />
    </div>
  );
};

export default LoginUser;
