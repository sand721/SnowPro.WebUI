import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid
} from "@mui/material";
import { axiosLessonService } from "../axiosConfig";
import {
    baseLessonEndPoint,
    formatDate,
    formatTime,
    lessonTypes,
    trainingLevels
} from "./utils";
import AssignInstructorDialog from "./AssignInstructorDialog"; // 👈 импорт

const LessonInfo = ({ open, handleClose, onSuccess, mode, id }) => {
    const initialFormData = {
        name: "",
        description: "",
        maxStudents: 0,
        lessonType: 0,
        trainingLevel: 0,
        dateLesson: "",
        timeStart: "",
        duration: 0,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false); // 👈 состояние
    const [currentInstructorId, setCurrentInstructorId] = useState("");
    useEffect(() => {
        if (open && mode === "edit" && id) {
            axiosLessonService
                .get(`/${baseLessonEndPoint}/${id}`)
                .then((response) => {
                    const data = response.data.data;
                    console.log("Lesson data:", data);
                    setCurrentInstructorId(data.instructor?.instructorId || "");
                    setFormData({
                        lessonId: data.id,
                        name: data.name || "",
                        description: data.description || "",
                        maxStudents: data.maxStudents || 0,
                        lessonType: data.lessonType?.id ?? 0,
                        trainingLevel: data.trainingLevel?.id ?? 0,
                        dateLesson: formatDate(data.dateFrom),
                        timeStart: formatTime(data.dateFrom),
                        duration: data.duration || 0,
                    });
                })
                .catch((error) => console.error(error));
        } else if (open && mode === "create") {
            setFormData(initialFormData);
        }
    }, [open, mode, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["lessonType", "trainingLevel", "duration"].includes(name)
                ? parseInt(value)
                : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = mode === "edit" ? "patch" : "post";
        const url = `/${baseLessonEndPoint}`;
        const payload = { ...formData };

        axiosLessonService({ method, url, data: payload })
            .then(() => {
                onSuccess(mode === "edit" ? "Lesson updated successfully" : "Lesson created successfully");
                handleClose();
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{mode === "edit" ? "Edit Lesson" : "Create Lesson"}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        {[{ label: "Name", name: "name", type: "text" },
                            { label: "Description", name: "description", type: "text" },
                            { label: "Max Students", name: "maxStudents", type: "number" },
                            { label: "Date Lesson", name: "dateLesson", type: "date" },
                            { label: "Time Start", name: "timeStart", type: "time" },
                            { label: "Duration (min)", name: "duration", type: "number" }
                        ].map(({ label, name, type }) => (
                            <Grid item xs={12} key={name}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type={type}
                                    name={name}
                                    label={label}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    InputLabelProps={["date", "time"].includes(type) ? { shrink: true } : {}}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="lessonType"
                                label="Lesson Type"
                                value={formData.lessonType}
                                onChange={handleChange}
                            >
                                {Object.entries(lessonTypes).map(([key, val]) => (
                                    <MenuItem key={key} value={parseInt(key)}>{val}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="trainingLevel"
                                label="Training Level"
                                value={formData.trainingLevel}
                                onChange={handleChange}
                            >
                                {Object.entries(trainingLevels).map(([key, val]) => (
                                    <MenuItem key={key} value={parseInt(key)}>{val}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {mode === "edit" && (
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => {
                                        //console.log("setAssignDialogOpen(true) called");
                                        setAssignDialogOpen(true);
                                    }}
                                >
                                    Assign Instructor
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: 2 }}>
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
                </DialogActions>
            </Dialog>

            {/* 👉 Диалог для назначения инструктора */}
            {mode === "edit" && id && (
                <AssignInstructorDialog
                    key={assignDialogOpen ? "open" : "closed"}
                    open={assignDialogOpen}
                    lessonId={id}
                    currentInstructorId={currentInstructorId}
                    onClose={() => setAssignDialogOpen(false)}
                    onSuccess={() => {
                        setAssignDialogOpen(false);
                        onSuccess("Instructor assigned successfully");
                    }}
                />
            )}
        </>
    );
};

export default LessonInfo;