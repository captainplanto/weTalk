import React, { useState } from "react";
import styled from "styled-components";
import { SearchResultComponent } from "../components/Search.component";

import TopicsComponent from "../components/Topics.component";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
  //const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
 const { querySearchResult } = useAppSelector((state) => state.topic);
  return (
    <Container>
      {querySearchResult.length === 0 ? (
        <TopicsComponent />
      ) : (
        <SearchResultComponent  />
      )}
    </Container>
  );
};
export default Home;

const Container = styled.div``;
