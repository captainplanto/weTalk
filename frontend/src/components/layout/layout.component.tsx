import { Image } from "@nextui-org/react";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import NavBarComponent from "../Navbar.component";
import { SearchComponent } from "../Search.component";
interface ILayout {
  children: ReactNode;

}
const homepageHeader =
  "https://res.cloudinary.com/captainkoder/image/upload/v1667783929/We-Talk/header-image_ehws1b.jpg";

export const LayOut: FC<ILayout> = ({ children, ...props }) => {
  const { mobileSearchBar } = useAppSelector((state) => state.topic);
  return (
    <Container >
      <header className="sticky_container">
        <Image
          src={homepageHeader}
          width="100%"
          height="15vh"
          objectFit="cover"
          className="header_image"
        />
        <div className="show_mobile">
          {mobileSearchBar ? (
            <SearchComponent
              type="text"
              name="search"
              placeholder="Find topic here"
            />
          ) : (
            ""
          )}
        </div>
        <NavBarComponent />
      </header>

      {children}
    </Container>
  );
};
const Container = styled.div`

  .header_image {
    filter: blur(3px);
    @media screen and (max-width: 500px) {
      filter: blur(0);
    }
  }
  .sticky_container {
    position: sticky;
    top: 0;
    z-index: 5000;
  }
  .show_mobile {
    @media screen and (min-width: 501px) {
      display: none;
    }
  }
`;
