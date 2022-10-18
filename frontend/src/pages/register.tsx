import React from "react";
import RegisterComponent from "../components/Register.component";
import { LoginImageBoiler } from "../constant/consts";

const RegisterUser = () => {
  return (
    <LoginImageBoiler>
      <RegisterComponent signIn={false} />
    </LoginImageBoiler>
  );
};

export default RegisterUser;
