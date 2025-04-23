import React, {useEffect, useState} from "react";
import {
    Container, Typography, Table, TableBody, TableCell,
    TableHead, TableRow, Button, Snackbar
} from "@mui/material";
import {axiosProfileService} from "../axiosConfig";
import {baseInstructorProfileEndPoint, formatDate } from "./utils";
import InstructorInfo from "./InstructorInfo";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstructorInfoList = () => {
    const [instructors, setInstructors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [selectedInstructorId, setSelectedInstructorId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    const loadInstructors = async () => {
        try {
            const response = await axiosProfileService.get(
                `/${baseInstructorProfileEndPoint}/list?page=1&itemsPerPage=20`
            );
            setInstructors([...response.data || []]);
        } catch (error) {
            console.error("Error loading instructors:", error);
            setInstructors([]);
        }
    };
    useEffect(() => {
        loadInstructors().then(r =>  console.log("Instructors loaded"));
    }, []);

    const openEditModal = (userId) => {
        setMode("edit");
        setSelectedInstructorId(userId);
        setModalOpen(true);
    };
    const handleDelete = (userId) => {
        axiosProfileService.delete(`/${baseInstructorProfileEndPoint}?userId=${userId}`)
            .then(() => {
                showSnackbar("Instructor deleted successfully");
                loadInstructors().then(r => console.log("Instructors loaded"));
            })
            .catch(console.error);
    };
    const handleCloseModal = () => setModalOpen(false);

    const handleSuccess = (message) => {
        loadInstructors().then(r => console.log("Instructors loaded"));
        showSnackbar("Data reloaded");
        console.log("Instructor loaded");
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        handleCloseModal(); // Закрываем модальное окно
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Instructors</Typography>
            <InstructorInfo
                open={modalOpen}
                mode={mode}
                id={selectedInstructorId}
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
                    <TableHead >
                        <TableRow >
                            <TableCell>Full Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Telegram</TableCell>
                            <TableCell>Hire date</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instructors.length > 0 ? (
                            instructors.map((data) => (
                                <TableRow key={data.userId}>
                                    <TableCell>
                                        {data.surname || data.name || data.patronymic
                                            ? [data.surname, data.name, data.patronymic].filter(Boolean).join(" ")
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{formatDate(data.birthDate) || "N/A" }</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{data.gender === 1 ? "M" : "F"}</TableCell>
                                    <TableCell>{data.email || "N/A"}</TableCell>
                                    <TableCell>{data.phoneNumber || "N/A"}</TableCell>
                                    <TableCell>{data.telegramName || "N/A"}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{formatDate(data.hireDate) || "N/A"}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{data.isActive ? 'Yes' : 'No'} </TableCell>
                                    <TableCell>
                                        <Button size="small"
                                                onClick={() =>openEditModal(data.userId)}>Edit</Button>
                                        <Button size="small" color="error"
                                                onClick={() => handleDelete(data.userId)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10} align="center">No instructors available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
        </Container>
    );
};

export default InstructorInfoList;
