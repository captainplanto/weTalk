import { FC } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ITopic } from "../types/type";
import { setQuery, setQuerySearch } from "../redux/features/topics";
import CardComponent from "./Card.component";
import { convertDate } from "../utils/date";
import PaperBackgroundComponent from "./Comments/PaperBackground.component";
interface ISearch {
  type: string;
  name: string;
  placeholder: string;
}

export const SearchComponent: FC<ISearch> = ({
  type,
  name,
  placeholder,
  ...props
}) => {
  const { databaseTopics, query } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const queryDataBase = databaseTopics.filter(({ topic }: ITopic) =>
    topic.includes(query.toLowerCase())
  );

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setQuerySearch(queryDataBase));
  
       //dispatch(setQuery(''));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <Box>
      <form onSubmit={onSearchSubmit}>
        <input
          type={type}
          value={query}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};
//<span style={{ color: "red" }}>topic</span>
export const SearchResultComponent = () => {
  const { querySearchResult, query } = useAppSelector((state) => state.topic);
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser = sessionUser.id;
  //const mapTopic = querySearchResult.map(({topic})=> topic.includes(query))

  return (
    <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
      {querySearchResult && querySearchResult.length > 0 ? (
        querySearchResult.map(
          ({ topic, _id, createdAt, author, username }: ITopic, index) => (
            <div
              key={index}
              className="all-posts"
              style={{ marginBottom: "2rem" }}
            >
              <CardComponent
                username={author?.username}
                remove={currentUser === author?._id ? "Delete" : ""}
                reply={"Reply"}
                edit={currentUser === author?._id ? "Edit" : ""}
                topic={topic}
                timestamp={`${convertDate(createdAt)} ago`}
                id={_id}
                showTopicDeleteButton={true}
                showTopicReplyButton={false}
                topicOwner={author?.username}
                showTopicEditButton={true}
                image={author.avatar}
                userId={author._id}
                isVoteOnTopic={true}
                className={"homepage_paperbackground"}
              />
            </div>
          )
        )
      ) : (
        <h5 className="color">
          <PaperBackgroundComponent style={no_post}>
            <h4>There is no matching result for the searched term</h4>
          </PaperBackgroundComponent>
        </h5>
      )}
    </div>
  );
};

const Box = styled.div`
  input {
    padding: 8px 16rem 8px 1rem;
    border-radius: 1rem;
    outline: none;
    border: none;
  }
`;
const no_post = {
  color: "var(--moderate-blue)",
  textAlign: "center",
};
