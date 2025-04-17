import React, { useEffect, useState } from 'react';
import {axiosProfileService} from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import {baseInstructorProfileEndPoint, formatDate, navDashboard, navInstructorInfo} from './utils';
import './ProfileInfo.css';

const InstructorInfoList = () => {
    const [instructor, setInstructor
    ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosProfileService.get(`/${baseInstructorProfileEndPoint}/list?page=1&itemsPerPage=20`)
            .then(response => setInstructor(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axiosProfileService.delete(`/${baseInstructorProfileEndPoint}/${id}`)
            .then(() => setInstructor(instructor.filter(instructor => instructor.id !== id)))
            .catch(error => console.error(error));
    };
    const handleEdit = (userId) => {
        console.log("Edit button clicked for userId:", userId);
        navigate(`/${navDashboard}/${navInstructorInfo}/${userId}/edit`);
    };
    return (
        <div>
            <h1>Instructors</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Active</th>
                    <th>Deleted</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {instructor.map(instructor => (
                    <tr key={instructor.id}>
                        <td>
                            {instructor.surname || instructor.name || instructor.patronymic
                                ? `${instructor.surname} ${instructor.name} ${instructor.patronymic}`
                                : 'N/A'}
                        </td>
                        <td>{formatDate(instructor.birthDate) || 'N/A'}</td>
                        <td>{instructor.gender === 1 ? 'M' : 'F'}</td>
                        <td>{instructor.phoneNumber}</td>
                        <td>{instructor.email}</td>
                        <td style={{ textAlign: "center" }}>{instructor.isActive ? 'Yes' : 'No'}</td>
                        <td style={{ textAlign: "center" }}>{instructor.isDeleted ? 'Yes' : 'No'}</td>
                        <td>
                            <button onClick={() => handleEdit(instructor.userId)}>Edit</button>
                            <button onClick={() => handleDelete(instructor.userId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstructorInfoList;