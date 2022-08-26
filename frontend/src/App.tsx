import React, { FC } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { ToggleComponent } from "./components/Toggle.component";
import { useAppSelector } from "./redux/hooks";
import RegisterUser from "./pages/register";
import LoginUser from "./pages/login";
import UserProfile from "./pages/profile";
import NavBarComponent from "./components/Navbar.component";
import AllTopics from "./pages/alltopic";
import NewTopic from "./pages/newtopic";
import TopicComment from "./pages/topiccomment";
import { ITopicReplyButton } from "./types/type";
import UserProfileComponent from "./pages/profile";
import ProfileComponent from "./components/Profile.component";

const App = () => {
  const { toggleMode } = useAppSelector((state) => state.topic);

  return (
    <AppContainer
      style={{
        backgroundColor: !toggleMode ? "rgb(36, 52, 71)" : "",
        minHeight: "100vh",
      }}
    >
      <ToggleComponent />
      <NavBarComponent />
      <ToastContainer
        className="toast-position"
        position="bottom-right"
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alltopic" element={<AllTopics />} />
        <Route path="/newtopic" element={<NewTopic />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/logout" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/topiccomment" element={<TopicComment  />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
export const customId = "custom-id-yes";
const AppContainer = styled.div``;
