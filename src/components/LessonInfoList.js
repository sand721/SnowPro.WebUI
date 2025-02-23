import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseLessonEndPoint, navLessonInfo, lessonTypes, trainingLevels } from "./utils";
import { axiosLessonService } from "../axiosConfig";
import "./ProfileInfo.css";

const LessonInfo = ({ mode, lessonData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        lessonId: lessonData.id,
        name: lessonData.name || "",
        description: lessonData.description || "",
        maxStudents: lessonData.maxStudents || 0,
        lessonType: lessonData.lessonType || 0,
        trainingLevel: lessonData.trainingLevel || 0,
        lessonStatus: 0,
        dateLesson: "",
        timeStart: "",
        duration: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "lessonType" || name === "trainingLevel" || name === "duration" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            dateFrom: `${formData.dateLesson}T${formData.timeStart}:00Z`
        };
        const method = mode === "edit" ? "patch" : "post";
        const url = `/${baseLessonEndPoint}`;
        axiosLessonService({
            method: method,
            url: url,
            data: formattedData,
        })
            .then(() => navigate(`/${navLessonInfo}`))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{mode} Lesson</h1>
            <div>
                <label>Lesson ID</label>
                <input type="text" name="lessonId" value={formData.lessonId} readOnly />
            </div>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
                <label>Max Students</label>
                <input type="number" name="maxStudents" value={formData.maxStudents} onChange={handleChange} />
            </div>
            <div>
                <label>Lesson Type</label>
                <select name="lessonType" value={formData.lessonType} onChange={handleChange}>
                    {Object.entries(lessonTypes).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Training Level</label>
                <select name="trainingLevel" value={formData.trainingLevel} onChange={handleChange}>
                    {Object.entries(trainingLevels).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Date Lesson</label>
                <input type="date" name="dateLesson" value={formData.dateLesson} onChange={handleChange} />
            </div>
            <div>
                <label>Time Start</label>
                <input type="time" name="timeStart" value={formData.timeStart} onChange={handleChange} />
            </div>
            <div>
                <label>Duration</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default LessonInfo;
