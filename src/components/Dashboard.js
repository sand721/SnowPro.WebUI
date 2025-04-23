import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './Dashboard.css';
import {navDashboard, navInstructorInfo, navLessonInfo, navProfileInfo} from "./utils";
import ClientInfo from "./ClientInfo";
import ClientInfoList from "./ClientInfoList";
import LessonInfo from "./LessonInfo";
import LessonInfoList from "./LessonInfoList";
import InstructorInfo from "./InstructorInfo";
import InstructorInfoList from "./InstructorInfoList";  // 🔹 Импортируем компонент

const Dashboard = ({mode}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || {};

    if (!user.role) {
        navigate('/');
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // 🔹 Функция для рендеринга содержимого в `main-layout`
    const renderMainForm = () => {
        switch (mode) {
            case `${navProfileInfo}-edit`:
                return <ClientInfo mode="edit" id={id} />;
            case `${navProfileInfo}-create`:
                return <ClientInfo />;
            case `${navProfileInfo}`:
                return <ClientInfoList />;

            case `${navLessonInfo}-edit`:
                return <LessonInfo mode="edit" id={id} />;
            case `${navLessonInfo}-create`:
                return <LessonInfo />;
            case `${navLessonInfo}`:
                return <LessonInfoList />;

            case `${navInstructorInfo}-edit`:
                return <InstructorInfo mode="edit" id={id} />;
            case `${navInstructorInfo}-create`:
                return <InstructorInfo />;
            case `${navInstructorInfo}`:
                return <InstructorInfoList />;

            default:
                return <h2> </h2>;
        }
    };

    const handleManageClientClick = () => navigate(`/${navDashboard}/${navProfileInfo}`);
    const handleManageInstructorClick = () => navigate(`/${navDashboard}/${navInstructorInfo}`);
    const handleManageLessonClick = () => navigate(`/${navDashboard}/${navLessonInfo}`);
    const handleProfile = () => {
        switch (user.role) {
            case 'Admin':
                navigate(`/${navDashboard}/${user.userId}/${navProfileInfo}`);
                return;
            case 'Client':
                return <ClientInfo mode="edit" id={user.userId}/>;
            case 'Instructor':
                return <InstructorInfo mode="edit" id={user.userId}/>;
            default:
                break;
        }
    }

    const renderMenu = () => {
        switch (user.role) {
            case 'Admin':
                return (
                    <div className="left">
                        <button onClick={handleManageClientClick}>Manage Client</button>
                        <button onClick={handleManageInstructorClick}>Manage Instructor</button>
                        <button onClick={handleManageLessonClick}>Manage Lesson</button>
                    </div>
                );
            case 'Client':
                return <ul><li>View Profile</li><li>Edit Details</li></ul>;
            case 'Instructor':
                return <ul><li>Manage Schedule</li><li>View Students</li></ul>;
            default:
                return <ul><li>Home</li></ul>;
        }
    };


    return (
        <div className="dashboard-container">
            <header>
                {renderMenu()}
                <div className="right">
                    <button onClick={handleProfile}> {user.firstName} {user.lastName} ({user.role})</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div className="main-layout">
                <main>{renderMainForm()}</main>
            </div>
        </div>
    );
};

export default Dashboard;
