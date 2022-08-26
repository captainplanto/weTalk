import { Avatar, Grid } from "@nextui-org/react";
import { Schema } from "mongoose";
import { FC} from "react";

interface IAvatar {
  src: string;
id?: Schema.Types.ObjectId;
}

const AvatarComponent: FC<IAvatar> = ({ src, id, ...props }) => {
  return (
    <Grid.Container>
      <Grid>
        <Avatar src={src} alt={src} />
      </Grid>
    </Grid.Container>
  );
};
export default AvatarComponent;
