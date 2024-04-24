import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import ChatRoomPage from "./pages/chatRoomPage";
import ContactsPage from "./pages/contactsPage";

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chatroom" element={<ChatRoomPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/" element={<Navigate replace to="/home" />} />
            </Routes>
        </Router>
    )
};

export default AppRoutes