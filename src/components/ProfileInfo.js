import React, { useState, useEffect } from "react";
import {axiosProfileService} from '../axiosConfig';
import { useParams, useNavigate } from "react-router-dom";
import {formatDate, baseClientProfileEndPoint, navProfileInfo} from "./utils";
import "./ProfileInfo.css";



const ProfileInfo = ({ mode, id}) => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        patronymic: "",
        birthDate: "",
        gender: 1,
        phoneNumber: "",
        telegramName: "",
        email: "",
        role: 0,
    });

    const [client, setClient] = useState(null);

    useEffect(() => {
        console.log('Start baseClientProfileEndPoint')
        console.log(baseClientProfileEndPoint)
        console.log('End baseClientProfileEndPoint')
        if (id && (mode === "edit" || mode === "view")) {
            axiosProfileService
                .get(`/${baseClientProfileEndPoint}/${id}`)
                .then((response) => {
                    const data = response.data;
                    setFormData({
                        name: data.name || "",
                        surname: data.surname || "",
                        patronymic: data.patronymic || "",
                        birthDate: formatDate(data.birthDate) || "",
                        gender: data.gender || 1,
                        phoneNumber: data.phoneNumber || "",
                        telegramName: data.telegramName || "",
                        email: data.email || "",
                        role: data.role || 0
                    });
                    setClient(data);
                })
                .catch((error) => console.error(error));
        }
    }, [id, mode]);

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
            birthDate: formatDate(formData.birthDate),
        };
        const method = mode === "edit" ? "put" : "post";
        const url = mode === "edit" ? `/${baseClientProfileEndPoint}/${id}` : `/${baseClientProfileEndPoint}`;
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
            {mode === "view" ? (
                <div align={"center"}>
                    <h1>
                        {client.surname} {client.name} {client.patronymic}
                    </h1>
                    <h2>Birthdate: {formatDate(client.birthDate) || "N/A"}</h2>
                    <h2>Phone Number: {client.phoneNumber}</h2>
                    <h2>Telegram Name: {client.telegramName}</h2>
                    <h2>Email: {client.email}</h2>
                    <button onClick={() => navigate(`/${baseClientProfileEndPoint}/${id}/edit`)}>Edit</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="form-container">
                    <h1>{mode} {id}</h1>
                    <div>
                        <label>Name</label>
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
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === 1}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === 2}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Telegram Name</label>
                        <input type="text" name="telegramName" value={formData.telegramName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
};

export default ProfileInfo;
