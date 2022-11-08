import { FC, ReactNode } from "react";
import styled from "styled-components";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { Link } from "react-router-dom";
import { useSession } from "../../pages/hooks/useSession";
export interface INavOptions {
  name: string | ReactNode;
  icon?: string | ReactNode;
  action?: () => void;
  id: number;
}
export interface INav {
  option: INavOptions[];
  showOnDesktop: boolean;
}

export const NavComponent: FC<INav> = ({ option, showOnDesktop, ...props }) => {
  const { session } = useSession();
  if (showOnDesktop) {
    return (
      <>
        <DesktopContainer>
          {option && option.length > 0 ? (
            option.map(({ name, id, action }, index) => (
              <div key={id} onClick={() => action && action()}>
                <div className="p">{name}</div>
              </div>
            ))
          ) : (
            <>
              <h4>Options to map not provided</h4>
            </>
          )}
        </DesktopContainer>
      </>
    );
  } else {
    return (
      <MobileContainer>
        {option && option.length > 0 ? (
          option.map(({ name, icon, id, action }, index) => (
            <div key={id} onClick={() => action && action()}>
              <p>{icon}</p>
              <p>{name}</p>
            </div>
          ))
        ) : (
          <>
            <h4>Options to map not provided</h4>
          </>
        )}
        {session && session._id && (
          <Link to="/newtopic">
            <div className="container">
              <div className="create_topic_mobile">
                <CreateRoundedIcon />
              </div>
            </div>
          </Link>
        )}
      </MobileContainer>
    );
  }
};

const DesktopContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-bottom: 10.3vh;
  display: grid;
  grid-template-columns: 1.5fr 4fr repeat(2, 0.7fr);
  grid-column-gap: 15px;
  grid-row-gap: 0px;
  padding-top: 2rem;
  color: white;
  text-align: center;
  background-color: var(--header-background);
  div {
    z-index: 10000;
    .p {
      :hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const MobileContainer = styled.div`
  background: var(--light-grayish-blue);
  z-index: 1000;
  bottom: 0;
  position: fixed;
  width: 100%;
  padding: 1rem;
  text-align: center;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .container {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 4rem;
  }
  .create_topic_mobile {
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 5rem;
    position: fixed;
    bottom: 10rem;
    color: white;
    background-color: var(--moderate-blue);
    transition: all 0.7s ease-out;
  }

  @media screen and (min-width: 501px) {
    display: none;
  }
`;
