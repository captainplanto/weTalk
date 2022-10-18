import { FC } from "react";
interface IMessage {
  firstName: string;
  lastName: string;
}

const  WelcomeTemplateComponent: FC<IMessage> = ({
  firstName,
  lastName,
}) => {
  return (
    <div>
      Hey {firstName} {lastName}! Welcome to WeTalk, create topics and like
      posts on the platform. I hope it helps!
    </div>
  );
};


export default WelcomeTemplateComponent;