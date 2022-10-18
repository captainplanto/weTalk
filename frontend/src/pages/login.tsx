import { Loading } from "@nextui-org/react";
import RegisterComponent from "../components/Register.component";
import { LoginImageBoiler } from "../constant/consts";
import { useAppSelector } from "../redux/hooks";

const LoginUser = () => {
  const { loginSuccessful } = useAppSelector((state) => state.topic);
  if (loginSuccessful === false) {
    return (
      <>
        <LoginImageBoiler>
          <RegisterComponent signIn={true} />
        </LoginImageBoiler>
      </>
    );
  } else {
    return (
      <LoginImageBoiler>
        <Loading type="points-opacity" color={"white"} />
      </LoginImageBoiler>
    );
  }
};

export default LoginUser;
