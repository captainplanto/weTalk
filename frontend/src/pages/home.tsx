import styled from "styled-components";
import NavBarComponent from "../components/Navbar.component";
import { SearchComponent } from "../components/Search.component";
import TopicsComponent from "../components/Topics.component";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
   const {  mobileSearchBar  } = useAppSelector((state) => state.topic);
  return (
    <Container>
      {mobileSearchBar ? (
        <SearchComponent
          type={"text"}
          name={"search"}
          placeholder={"Find topic here"}
        />
      ) : (
        ""
      )}
     <NavBarComponent />
      <TopicsComponent />
    </Container>
  );
};
export default Home;

const Container = styled.div``;
