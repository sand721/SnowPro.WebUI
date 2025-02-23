import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfileInfoList from './components/ProfileInfoList';
import InstructorInfoList from './components/InstructorInfoList';
import LessonInfoList from './components/LessonInfoList';
import './App.css';
import ProfileInfo from "./components/ProfileInfo";
import {navInstructorInfo, navLessonInfo, navProfileInfo} from "./components/utils";
import LessonInfo from "./components/LessonInfo";
import InstructorInfo from "./components/InstructorInfo";

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <div className="sidebar">
                    <h2>Menu</h2>
                    <ul>
                        <li><Link to={`/${navProfileInfo}`}>Students</Link></li>
                        <li><Link to={`/${navInstructorInfo}`}>Instructors</Link></li>
                        <li><Link to={`/${navLessonInfo}`}>Lessons</Link></li>
                    </ul>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<ProfileInfoList />} /> {/* Добавленный маршрут */}
                        <Route path={`/${navProfileInfo}/*`} element={<ProfileInfoList />} />
                        <Route path={`/${navProfileInfo}/:id/edit`} element={<ProfileInfo mode="edit" />} />
                        <Route path={`/${navProfileInfo}/create`} element={<ProfileInfo mode="create" />} />
                        <Route path={`/${navLessonInfo}/*`} element={<LessonInfoList />} /> {/* Используйте переменную */}
                        <Route path={`/${navLessonInfo}/:id/edit`} element={<LessonInfo mode="edit" />} />
                        <Route path={`/${navLessonInfo}/create`} element={<LessonInfo mode="create" />} />
                        <Route path={`/${navInstructorInfo}/*`} element={<InstructorInfoList />} />
                        <Route path={`/${navInstructorInfo}/:id/edit`} element={<InstructorInfo mode="edit" />} />
                        <Route path={`/${navInstructorInfo}/create`} element={<InstructorInfo mode="create" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;