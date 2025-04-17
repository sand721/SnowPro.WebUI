import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import RegisterForm from "./components/RegisterForm";
import RegistrationSuccess from "./components/RegistrationSuccess";
import Dashboard from "./components/Dashboard";
import './App.css';
import {navDashboard, navInstructorInfo, navLessonInfo, navProfileInfo} from "./components/utils";
import { BASE_AUTH_URL, LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./config";

const App = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState("");

    const handleLogin = async (credentials, navigate) => {
        try {
            const response = await fetch(`${BASE_AUTH_URL}${LOGIN_ENDPOINT}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Login Success:", data);
                localStorage.setItem("user", JSON.stringify(data));
                navigate(`/${navDashboard}`);
            } else {
                console.error("Login Failed:", data.error || "Login failed");
                throw new Error(data.error || "Login failed"); // 👈 важно
            }
        } catch (error) {
            console.error("Login Failed:", error);
        }
    };

    const handleRegister = async (credentials) => {
        try {
            const response = await fetch(`${BASE_AUTH_URL}${REGISTER_ENDPOINT}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Registration Success:", data);
                setRegistrationSuccess(true);
                setRegistrationError("");
            } else {
                setRegistrationError(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration Failed:", error);
            setRegistrationError("An unexpected error occurred.");
        }
    };

    if (registrationSuccess) {
        return <RegistrationSuccess onBackToLogin={() => {
            setRegistrationSuccess(false);
            setIsRegistering(false);
        }} />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    isRegistering ? 
                        <RegisterForm onRegister={handleRegister} switchToLogin={() => setIsRegistering(false)} registrationError={registrationError} /> : 
                        <AuthForm onLogin={handleLogin} switchToRegister={() => setIsRegistering(true)} />
                } />
                <Route path={`/${navDashboard}`} element={<Dashboard />} />
                <Route path={`/${navDashboard}/${navProfileInfo}`} element={<Dashboard mode="profileinfo" />} />
                <Route path={`/${navDashboard}/${navProfileInfo}/:id/edit`} element={<Dashboard mode="profileinfo-edit" />} />
                <Route path={`/${navDashboard}/${navProfileInfo}/create`} element={<Dashboard mode="profileinfo-create" />} />


                <Route path={`/${navDashboard}/${navLessonInfo}/*`} element={<Dashboard mode="lessoninfo" />} /> {/* Используйте переменную */}
                <Route path={`/${navDashboard}/${navLessonInfo}/:id/edit`} element={<Dashboard mode="lessoninfo-edit" />} />
                <Route path={`/${navDashboard}/${navLessonInfo}/create`} element={<Dashboard mode="lessoninfo-create" />} />

                <Route path={`/${navDashboard}/${navInstructorInfo}/*`} element={<Dashboard mode="instructorinfo" />} />
                <Route path={`/${navDashboard}/${navInstructorInfo}/:id/edit`} element={<Dashboard mode="instructorinfo-edit" />} />
                <Route path={`/${navDashboard}/${navInstructorInfo}/create`} element={<Dashboard mode="instructorinfo-create" />} />

            </Routes>
        </Router>
    );
};

export default App;
