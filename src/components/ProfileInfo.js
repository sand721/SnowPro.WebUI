import React, { useState, useEffect } from "react";
import {axiosProfileService} from '../axiosConfig';
import { useParams, useNavigate } from "react-router-dom";
import {formatDate, baseClientProfileEndPoint, navProfileInfo, formatDateTime} from "./utils";
import "./ProfileInfo.css";



const ProfileInfo = ({ mode }) => {
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
        isActive: true,
        isDeleted: false,
        updatedDate: "",
        status: 1,
        updatedUserId: "",
        photoId: "",
        typeSportEquipmentProfile: [],
        ownerProfileInfoId: "",
        id: "",
        userId: "",
        createdDate: "",

    });

    const [client, setClient] = useState(null);

    useEffect(() => {
        if (userId && (mode === "edit" || mode === "view")) {
            axiosProfileService
                .get(`/${baseClientProfileEndPoint}/?userid=${userId}`)
                .then((response) => {
                    const data = response.data;
                    setFormData({
                        id: data.id ||"",
                        userId: data.userId || "",
                        name: data.name || "",
                        surname: data.surname || "",
                        patronymic: data.patronymic || "",
                        birthDate: formatDate(data.birthDate) || "",
                        gender: data.gender || 1,
                        phoneNumber: data.phoneNumber || "",
                        telegramName: data.telegramName || "",
                        email: data.email || "",
                        isActive: data.isActive || true,
                        isDeleted: data.isDeleted || false,
                        status: 1,
                    });
                    setClient(data);
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
        };
        const method = mode === "edit" ? "put" : "post";
        const url = mode === "edit" ? `/${baseClientProfileEndPoint}?userid=${userId}` : `/${baseClientProfileEndPoint}`;
        axiosProfileService({
            method: method,
            url: url,
            data: formattedData,
        })
            .then(() => navigate(`/dashboard/${navProfileInfo}`))
            .catch((error) => console.error(error));
    };

    if (mode === "view" && !client) return <div>Loading...</div>;

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Edit client's profile</h1>
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

export default ProfileInfo;
