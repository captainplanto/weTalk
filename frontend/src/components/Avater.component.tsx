import { Avatar, Grid} from "@nextui-org/react";
import { Schema } from "mongoose";
import { FC } from "react";

interface IAvatar {
  src: string;
  id?: Schema.Types.ObjectId;
  username?: string;
}

const AvatarComponent: FC<IAvatar> = ({ src, id, username, ...props }) => {
  if (src) {
    return (
      <Grid.Container>
        <Grid>
          <Avatar src={src} alt={src} />
        </Grid>
      </Grid.Container>
    );
  } else {
    return (
      <Grid.Container>
        <Grid>
          <h4 style={no_avatar}>{username?.slice(0, 1)}</h4>
        </Grid>
      </Grid.Container>
    );
  }
};
export default AvatarComponent;
const no_avatar = {
  display: "flex",
  backgroundColor: "var( --moderate-blue)",
  color:'white',
  width: "2.3rem",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  height: "2.3rem",
  borderRadius: "3rem",
};
