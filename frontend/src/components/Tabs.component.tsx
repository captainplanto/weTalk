import { Divider } from "@nextui-org/react";
import React from "react";
import styled from "styled-components";
import { TabContents } from "../constant/consts";
import { setCurrentTab } from "../redux/features/userprofile";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const TabComponent = () => {
  const { currentTab } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const handleTabSelector = (id: number) => {
    dispatch(setCurrentTab(id));
  };
  return (
    <>
      <TabContainer>
        {TabContents &&
          TabContents.map(({ id, title }) => (
            <div key={id}>
              <h4 onClick={() => handleTabSelector(id)}>{title}</h4>
              <div className={currentTab === id ? "color-switch" : ""}></div>
            </div>
          ))}
      </TabContainer>
      <Divider />
    </>
  );
};

export default TabComponent;

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 15rem;
  place-items: center;
  div {
    h4 {
      color: var(--moderate-blue);
      :hover {
        cursor: pointer;
      }
    }
  }
  .color-switch {
    content: "";
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 1px;
    background: var(--moderate-blue);
  }
`;
