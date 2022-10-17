import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PaperBackgroundComponent from "./Comments/PaperBackground.component";
import CardComponent from "./Card.component";
import { convertDate } from "../utils/date";
import { ITopic } from "../types/type";
import { setMobileSearchBar, setQuerySearch } from "../redux/features/topics";
import { useEffect } from "react";
import { SearchComponent } from "./Search.component";

export const SearchResultComponent = () => {
  const { querySearchResult, mobileSearchBar  } = useAppSelector((state) => state.topic);

  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser = sessionUser.id;
  useEffect(() => {
    const getQueryString = localStorage.getItem("queryString");
    const result = getQueryString ? JSON.parse(getQueryString) : [];
    dispatch(setQuerySearch(result));

    const getShowSearch = localStorage.getItem("mobileSearchBox");
    const response = getShowSearch ? JSON.parse(getShowSearch) : "";
    if (response) {
      dispatch(setMobileSearchBar(response));
    } else {
      dispatch(setMobileSearchBar(!response));
    }
  }, []);

  return (
      <>
        {mobileSearchBar ? (
        <SearchComponent
          type={"text"}
          name={"search"}
          placeholder={"Find topic here"}
        />
      ) : (
        ""
      )}
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
    </>
  );
};

const no_post = {
  color: "var(--moderate-blue)",
  textAlign: "center",
};
