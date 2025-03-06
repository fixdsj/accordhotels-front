import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login-page.jsx";
import RegisterPage from "./components/register-page.jsx";
import SearchPage from "./components/search-page.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import ErrorPage from "./components/error-page.jsx";
import BookingPage from "./components/booking-page.jsx";
import AdminPage from "./components/admin-page.jsx";
import AccountPage from "./components/account-page.jsx";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
function App() {
    const { token, logout } = useAuth();

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token) {
                const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp * 1000;
                if (Date.now() >= tokenExpiration) {
                    logout();
                }
            }
        };

        checkTokenExpiration();
    }, [token, logout]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/" element={<SearchPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App