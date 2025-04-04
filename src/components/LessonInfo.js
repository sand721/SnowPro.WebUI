import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    baseLessonEndPoint,
    navLessonInfo,
    lessonTypes,
    trainingLevels,
    formatDate,
    formatTime,
    navDashboard
} from "./utils";
import {axiosLessonService} from "../axiosConfig";
import "./ProfileInfo.css";

const LessonInfo = ({mode, id}) => {
    //const {id} = useParams();
    const navigate = useNavigate();
    //const [lesson, setLesson] = useState(null); // Исправлено имя переменной
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        maxStudents: 0,
        lessonType: 0,
        trainingLevel: 0,
        dateLesson: "",
        timeStart: "",
        duration: 0
    });

    useEffect(() => {
        if (id && mode === "edit") {
            axiosLessonService
                .get(`/${baseLessonEndPoint}/${id}`)
                .then((response) => {
                    const data = response.data.data;
                    console.log("Lesson data:", data); // Проверяем, что приходит
                    //setLesson(data); // Теперь должно работать

                    setFormData({
                        lessonId: data.id,
                        name: data.name || "",
                        description: data.description || "",
                        maxStudents: data.maxStudents || 0,
                        lessonType: data.lessonType?.id ?? 0,
                        trainingLevel: data.trainingLevel?.id ?? 0,
                        dateLesson: formatDate(data.dateLesson),
                        timeStart: formatTime(data.timeStart),
                        duration: data.duration || 0
                    });
                })
                .catch((error) => console.error(error));
        }
    }, [id, mode]); // Убрали setLesson из зависимостей

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log("lessonType type:", typeof formData.lessonType);
        console.log("trainingLevel type:", typeof formData.trainingLevel);

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "lessonType" || name === "trainingLevel" || name === "duration" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData
        };
        console.log("Отправляем в API:", formattedData); // Проверка данных перед отправкой

        const method = mode === "edit" ? "patch" : "post";
        const url = `/${baseLessonEndPoint}`;
        axiosLessonService({
            method: method,
            url: url,
            data: formattedData,
        })
            .then(() => navigate(`/${navDashboard}/${navLessonInfo}`))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{mode} Lesson</h1>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange}/>
            </div>
            <div>
                <label>Max Students</label>
                <input type="number" name="maxStudents" value={formData.maxStudents} onChange={handleChange}/>
            </div>
            <div>
                <label>Lesson Type</label>
                <select name="lessonType" value={formData.lessonType} onChange={handleChange}>
                    {Object.entries(lessonTypes).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Training Level</label>
                <select name="trainingLevel" value={formData.trainingLevel} onChange={handleChange}>
                    {Object.entries(trainingLevels).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Date Lesson</label>
                <input type="date" name="dateLesson" value={formData.dateLesson} onChange={handleChange}/>
            </div>
            <div>
                <label>Time Start</label>
                <input type="time" name="timeStart" value={formData.timeStart} onChange={handleChange}/>
            </div>
            <div>
                <label>Duration</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange}/>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default LessonInfo;
