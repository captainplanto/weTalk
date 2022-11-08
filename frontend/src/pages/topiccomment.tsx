import CommentComponent from "../components/Comments/comments.component";
import { LayOut } from "../components/layout/layout.component";
const TopicComment = () => {
  return (
    <LayOut>
      <div style={marginTop}>
        <CommentComponent />
      </div>
    </LayOut>
  );
};

export default TopicComment;
const marginTop = {
  marginTop: "4rem",
};
