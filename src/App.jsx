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

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<SearchPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App