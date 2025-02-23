import React, { useEffect, useState } from 'react';
import {axiosProfileService} from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { baseInstructorProfileEndPoint, formatDate, navInstructorInfo } from './utils';
import './ProfileInfo.css';

const InstructorInfoList = () => {
    const [instructor, setInstructor
    ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosProfileService.get(`/${baseInstructorProfileEndPoint}/list/1/10`)
            .then(response => setInstructor(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axiosProfileService.delete(`/${baseInstructorProfileEndPoint}/${id}`)
            .then(() => setInstructor(instructor.filter(instructor => instructor.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Instructors Info List</h1>
            <button onClick={() => navigate(`/${navInstructorInfo}/create`)}>Add New Instructor</button>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {instructor.map(instructor => (
                    <tr key={instructor.id}>
                        <td>{instructor.surname} {instructor.name} {instructor.patronymic}</td>
                        <td>{formatDate(instructor.birthDate) || 'N/A'}</td>
                        <td>{instructor.gender === 1 ? 'M' : 'F'}</td>
                        <td>{instructor.phoneNumber}</td>
                        <td>{instructor.email}</td>
                        <td>
                            <button onClick={() => navigate(`/${navInstructorInfo}/${instructor.id}/edit`)}>Edit</button>
                            <button onClick={() => handleDelete(instructor.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstructorInfoList;