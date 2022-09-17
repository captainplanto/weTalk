import  { useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { ToggleComponent } from "./components/Toggle.component";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import RegisterUser from "./pages/register";
import LoginUser from "./pages/login";
import NavBarComponent from "./components/Navbar.component";
import AllTopics from "./pages/alltopic";
import NewTopic from "./pages/newtopic";
import TopicComment from "./pages/topiccomment";
import ProfileComponent from "./components/userprofiles/Profile.component";
import { ToggleSwitch } from "./redux/features/topics";

const App = () => {
  const { toggleMode } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const themeInStorage = localStorage.getItem("theme");
    const showTheme = themeInStorage ? JSON.parse(themeInStorage) : "";
    if (showTheme === true) {
      dispatch(ToggleSwitch(toggleMode));
    } else {
      dispatch(ToggleSwitch(!toggleMode));
    }
  }, []);

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
        <Route path="/topiccomment" element={<TopicComment />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
export const customId = "custom-id-yes";
const AppContainer = styled.div``;
