import React, { useEffect, useState } from 'react';
import {axiosLessonService} from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import {baseLessonEndPoint, formatDate,formatTime, navDashboard, navLessonInfo} from './utils';
import './ProfileInfo.css';

const LessonInfoList = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosLessonService.get(`/${baseLessonEndPoint}`)
            .then(response => {
                setClients(response.data.data||[]);})
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axiosLessonService.delete(`/${baseLessonEndPoint}/${id}`)
            .then(() => setClients(clients.filter(client => client.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Lesson Info List</h1>
            <button onClick={() => navigate(`/${navDashboard}/${navLessonInfo}/create`)}>Add New Lesson</button>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Max  Students</th>
                    <th>Description</th>
                    <th>Durations</th>
                    <th>Level</th>
                    <th>Trainer</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(clients) && clients.length > 0 ? (
                    clients.map(lesson => (
                        <tr key={lesson.id}>
                            <td>{lesson.name}</td>
                            <td>{formatDate(lesson.dateFrom) || 'N/A'}</td>
                            <td>{formatTime(lesson.dateFrom) || 'N/A'}</td>
                            <td>{lesson.lessonType?.name || 'N/A'}</td>
                            <td>{lesson.maxStudents}</td>
                            <td>{lesson.description}</td>
                            <td>{lesson.duration}</td>
                            <td>{lesson.trainingLevel?.name || 'N/A'}</td>
                            <td>{lesson.trainer?.name || 'No trainer assigned'}</td>
                            <td>
                                <button onClick={() => navigate(`/${navDashboard}/${navLessonInfo}/${lesson.id}/edit`)}>Edit</button>
                                <button onClick={() => handleDelete(lesson.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>No lessons available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default LessonInfoList;