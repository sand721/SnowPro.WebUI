import React, { useEffect, useState } from 'react';
import {axiosProfileService} from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import {baseClientProfileEndPoint, formatDate, getUserToken, navDashboard, navProfileInfo} from './utils';
import './ProfileInfo.css';
import axios from "axios";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};
const ProfileInfoList = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = getUserToken();
        const decoded = parseJwt(userToken);
        console.log(`Bearer ${userToken}`)
        console.log("Декодированный токен:", decoded);

        if (decoded && decoded.exp) {
            console.log("Токен истекает:", new Date(decoded.exp * 1000).toUTCString());
            if (Date.now() / 1000 > decoded.exp) {
                console.warn("❌ Токен истёк! Нужно обновить.");
            }
        }
        axiosProfileService.get(`/${baseClientProfileEndPoint}/list/1/50`)
            .then(response => setClients(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axiosProfileService.delete(`/${baseClientProfileEndPoint}/${id}`)
            .then(() => setClients(clients.filter(client => client.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Profile Info List</h1>
            <button onClick={() => navigate(`/${navDashboard}/${navProfileInfo}/create`)}>Add New Student</button>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Telegram</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.surname} {client.name} {client.patronymic}</td>
                        <td>{formatDate(client.birthDate) || 'N/A'}</td>
                        <th>{client.gender===1 ? 'M' : 'F'}</th>
                        <td>{client.phoneNumber}</td>
                        <td>{client.telegramName}</td>
                        <td>{client.email}</td>
                        <td>
                            <button onClick={() => navigate(`/${navDashboard}/${navProfileInfo}/${client.id}/edit`)}>Edit</button>
                            <button onClick={() => handleDelete(client.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfileInfoList;