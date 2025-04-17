import React, { useState, useEffect } from "react";
import {axiosProfileService} from '../axiosConfig';
import { useNavigate } from "react-router-dom";
import {formatDate, baseInstructorProfileEndPoint, navInstructorInfo, navDashboard, formatDateTime} from "./utils";
import "./ProfileInfo.css";
import { useParams } from 'react-router-dom';
const InstructorInfo = ({ mode }) => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        patronymic: "",
        birthDate: "",
        gender: 0,
        phoneNumber: "",
        email: "",
        telegramName: "",
        hireDate: "",
        dateDismissal: "",
        isActive: true,
        isDeleted: false,
        updatedDate: "",
        status: 1,
        updatedUserId: "",
        photoId: "",
        typeSportEquipmentProfile: [],
        positionId: 0,
        experienceBeforeHiring: 0,
        id: "",
        userId: "",
        createdDate: "",
    });
    const [instructor, setInstructor] = useState(null);

    useEffect(() => {
        if (userId && (mode === "edit" || mode === "view")) {
            axiosProfileService
                .get(`/${baseInstructorProfileEndPoint}?userid=${userId}`)
                .then((response) => {
                    const data = response.data;
                    setFormData({
                        id: data.id ||"",
                        userId: data.userId || "",
                        createdDate: data.createdDate || "",
                        name: data.name || "",
                        surname: data.surname || "",
                        patronymic: data.patronymic || "",
                        birthDate: formatDate(data.birthDate) || "",
                        gender: data.gender || 1,
                        phoneNumber: data.phoneNumber || "",
                        email: data.email || "",
                        telegramName: data.telegramName || "",
                        hireDate: formatDate(data.hireDate) || "",
                        dateDismissal: formatDate(data.dateDismissal) || "",
                        isActive: data.isActive || true,
                        isDeleted: data.isDeleted || false,
                        status: 1,
                    });
                    setInstructor(data);
                })
                .catch((error) => console.error(error));
        }
    }, [userId, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "gender" ? (value === "Male" ? 1 : 2) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            birthDate: formatDateTime(formData.birthDate) ,
            hireDate: formatDateTime(formData.hireDate),
            dateDismissal: formatDateTime(formData.dateDismissal),
        };
        const method = mode === "edit" ? "put" : "post";
        const url = mode === "edit" ? `/${baseInstructorProfileEndPoint}?userid=${userId}` : `/${baseInstructorProfileEndPoint}`;
        axiosProfileService({
            method: method,
            url: url,
            data: formattedData,
        })
            .then(() => {
                // Первый запрос успешно завершён
                return axiosProfileService.put(`/${baseInstructorProfileEndPoint}/confirmСhanges?userid=${userId}&profileStatus=3`);
            })
            .then(() => navigate(`/${navDashboard}/${navInstructorInfo}`))
            .catch((error) => console.error(error));
    };

    if (mode === "view" && !instructor) return <div>Loading...</div>;

    return (
        <div>
                <form onSubmit={handleSubmit} className="form-container">
                    <h1>Edit instructor's profile</h1>
                    <div>
                        <label>First Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Surname</label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Patronymic</label>
                        <input type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Birthdate</label>
                        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Sex</label>
                        <div>
                            <label>
                                <input type="radio" name="gender" value="Male" checked={formData.gender === 1} onChange={handleChange} /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" checked={formData.gender === 2} onChange={handleChange} /> Female
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Telegram</label>
                        <input type="text" name="telegramName" value={formData.telegramName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Hire Date</label>
                        <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Date Dismissal</label>
                        <input type="date" name="dateDismissal" value={formData.dateDismissal} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Is Active</label>
                        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={() => setFormData({ ...formData, isActive: !formData.isActive })}/>
                    </div>
                    <div>
                        <label>Is Deleted</label>
                        <input type="checkbox" name="isDeleted" checked={formData.isDeleted} onChange={() => setFormData({ ...formData, isDeleted: !formData.isDeleted })}/>
                    </div>
                    <button type="submit">Save</button>
                </form>
        </div>
    );
};

export default InstructorInfo;