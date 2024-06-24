import "./App.css";
// import ProfileSettings from "./Profile Settings/ProfileSettings";
// import ChangePassword from "./Profile Settings/ChangePassword.js";
// import EditProfile from "./Profile Settings/EditProfile.js";
// import Notifications from "./Profile Settings/Notifications.js";
// import MessageList from "./Profile Settings/MessageList.js";
// import MyChatApp from "./Profile Settings/MyChatApp.js";
// import Header from "./Profile Settings/Header.js";
// import Card from "./Profile Settings/Card.js";
import BoardEdit from "./Profile Settings/BoardEdit";
// import SelectTools from "./Profile Settings/SelectTools";
// import StickerPicker from "./Profile Settings/StickerPicker";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import OnBoarding from "./Components/OnboardingScreen/OnBoardingMain";
// import Home from "./Components/HomePage/Home";
// import SignupPage from "./SignupPage";
// import CreateBoard from "./Board/CreateBoard";
// import LayersPanel from "./Board/ActionBar/Layers/Layers";
// import BoardBuilderPage from "./Board/BoardBuilderPage"
// import EditBoard from "./Board/EditBoard"
// import ImageEditingTools from "./Profile Settings/ImageEditingTools";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
       <Header />  
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signuppage" element={<SignupPage />} /> 
        <Route path="/boardBuilder" element={<BoardBuilderPage />} />
        <Route
          path="/boardBuilder-BoardInfo-createPost"
          element={<CreateBoard />}
        />
        <Route path="/board-builder-edit-board" element={<EditBoard />} />
        <Route
          path="/board-builder-actionbar-layers"
          element={<LayersPanel />}
        />    </Routes>
    </BrowserRouter> */}

      {/* <ProfileSettings />
      <ChangePassword/>
      <EditProfile />
      <Notifications />
      <EditProfile />
      <MessageList />
      <MyChatApp />
      <Header />
      <Card /> */}
      <BoardEdit />
      {/* <SelectTools /> */}
      {/* <StickerPicker/> */}
      
    </div>
  );
}

export default App;
