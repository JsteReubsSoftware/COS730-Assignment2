import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import ProfilePage from "./pages/profilePage";
import ContactsPage from "./pages/contactsPage";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import ViewContactPage from "./pages/viewContactPage";

const AppRoutes = () => {

    // check if user is logged in
    const isLoggedIn = () => {
        if (!Cookies.get('jwt')) {
            return false;
        }

        const token = Cookies.get('jwt');

        try {
            const now = new Date();
            const decoded = jwtDecode(token);
            if (decoded.exp < now.getTime() / 1000) {
                return false;
            }

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/profile" element={isLoggedIn() ? <ProfilePage/> : <Navigate replace to="/landing" />} />
            <Route path="/contacts/view" element={isLoggedIn() ? <ViewContactPage/> : <Navigate replace to="/landing" />} />
            <Route path="/contacts" element={isLoggedIn() ? <ContactsPage/> : <Navigate replace to="/landing" />} />
            <Route path="/" element={<Navigate replace to="/landing" />} />
            <Route path="*" element={<Navigate replace to="/landing" />} />
        </Routes>
    )
};

export default AppRoutes