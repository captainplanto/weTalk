import React from "react";
import styled from "styled-components";

import AllCommentComponent from "../components/Topics.component";

const Home = () => {
  return (
    <Container>
      <AllCommentComponent />
    </Container>
  );
};
export default Home;

const Container = styled.div``;
