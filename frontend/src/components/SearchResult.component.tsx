import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PaperBackgroundComponent from "./PaperBackground.component";
import CardComponent from "./Card.component";
import { convertDate } from "../utils/date";
import { ITopic } from "../types/type";
import {  setQuerySearch } from "../redux/features/topics";
import { useEffect } from "react";
import { useSession } from "../pages/hooks/useSession";

export const SearchResultComponent = () => {
  const { querySearchResult } = useAppSelector(
    (state) => state.topic
  );
  const dispatch = useAppDispatch();
  const { session } = useSession();

  useEffect(() => {
    const getQueryString = localStorage.getItem("queryString");
    const result = getQueryString ? JSON.parse(getQueryString) : [];
    dispatch(setQuerySearch(result));

  }, []);

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
                remove={session && session._id === author?._id ? "Delete" : ""}
                reply={"Reply"}
                edit={session && session._id === author?._id ? "Edit" : ""}
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

const no_post = {
  color: "var(--moderate-blue)",
  textAlign: "center",
};



