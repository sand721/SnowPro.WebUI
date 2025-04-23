import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Snackbar
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { axiosLessonService } from "../axiosConfig";
import {
    baseLessonEndPoint,
    formatDate,
    formatTime
} from "./utils";
import LessonInfo from "./LessonInfo";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LessonInfoList = () => {
    const [lessons, setLessons] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    const loadLessons = () => {
        axiosLessonService
            .get(`/${baseLessonEndPoint}`)
            .then((res) => {
                console.log("📦 Загруженные уроки:", res.data); // <-- здесь отладка
                setLessons(res.data.data || []);
            })
            .catch(console.error);
    };

    useEffect(() => {
        loadLessons();
    }, []);

    const openCreateModal = () => {
        setMode("create");
        setSelectedLessonId(null);
        setModalOpen(true);
    };

    const openEditModal = (id) => {
        setMode("edit");
        setSelectedLessonId(id);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        axiosLessonService
            .delete(`/${baseLessonEndPoint}/${id}`)
            .then(() => {
                loadLessons();
                showSnackbar("Lesson deleted successfully");
            })
            .catch(console.error);
    };

    const handleCloseModal = () => setModalOpen(false);

    const handleSuccess = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        loadLessons();
    };

    return (

        <Container>
            <Typography variant="h4" gutterBottom>Lessons</Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={openCreateModal}
            >
                Add New Lesson
            </Button>

            <LessonInfo
                open={modalOpen}
                mode={mode}
                id={selectedLessonId}
                handleClose={handleCloseModal}
                onSuccess={handleSuccess}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Max Students</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Trainer</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <TableRow key={lesson.id}>
                                <TableCell>{lesson.name}</TableCell>
                                <TableCell>{formatDate(lesson.dateFrom)}</TableCell>
                                <TableCell>{formatTime(lesson.dateFrom)}</TableCell>
                                <TableCell>{lesson.lessonType?.name || "N/A"}</TableCell>
                                <TableCell>{lesson.maxStudents}</TableCell>
                                <TableCell>{lesson.description}</TableCell>
                                <TableCell>{lesson.duration}</TableCell>
                                <TableCell>{lesson.trainingLevel?.name || "N/A"}</TableCell>
                                <TableCell>{lesson.instructor?.name || "No trainer assigned"}</TableCell>
                                <TableCell>
                                    <Button size="small" onClick={() => openEditModal(lesson.id)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(lesson.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={10} align="center">No lessons available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Container>
    );
};

export default LessonInfoList;
