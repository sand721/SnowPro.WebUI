import React, {useEffect, useState} from "react";
import {
    Container, Typography, Table, TableBody, TableCell,
    TableHead, TableRow, Button, Snackbar
} from "@mui/material";
import {axiosProfileService} from "../axiosConfig";
import {baseClientProfileEndPoint, formatDate } from "./utils";
import ClientInfo from "./ClientInfo";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ClientInfoList = () => {
    const [Clients, setClients] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    const loadClients = async () => {
        try {
            const response = await axiosProfileService.get(
                `/${baseClientProfileEndPoint}/list?page=1&itemsPerPage=20`
            );
            setClients([...response.data || []]);
        } catch (error) {
            console.error("Error loading Clients:", error);
            setClients([]);
        }
    };
    useEffect(() => {
        loadClients().then(r =>  console.log("Clients loaded"));
    }, []);

    const openEditModal = (userId) => {
        setMode("edit");
        setSelectedClientId(userId);
        setModalOpen(true);
    };
    const handleDelete = (userId) => {
        axiosProfileService.delete(`/${baseClientProfileEndPoint}?userId=${userId}`)
            .then(() => {
                showSnackbar("Client deleted successfully");
                loadClients().then(r => console.log("Clients loaded"));
            })
            .catch(console.error);
    };
    const handleCloseModal = () => setModalOpen(false);

    const handleSuccess = (message) => {
        loadClients().then(r => console.log("Clients loaded"));
        showSnackbar("Data reloaded");
        console.log("Client loaded");
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        handleCloseModal(); // Закрываем модальное окно
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Clients</Typography>
            <ClientInfo
                open={modalOpen}
                mode={mode}
                id={selectedClientId}
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
                            <TableCell>Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Clients.length > 0 ? (
                            Clients.map((data) => (
                                <TableRow key={data.userId}>
                                    <TableCell>
                                        {data.surname || data.name || data.patronymic
                                            ? [data.surname, data.name, data.patronymic].filter(Boolean).join(" ")
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{formatDate(data.birthDate) || "N/A"}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{data.gender === 1 ? "M" : "F"}</TableCell>
                                    <TableCell>{data.email || "N/A"}</TableCell>
                                    <TableCell>{data.phoneNumber || "N/A"}</TableCell>
                                    <TableCell>{data.telegramName || "N/A"}</TableCell>
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
                                <TableCell colSpan={10} align="center">No Clients available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
        </Container>
    );
};

export default ClientInfoList;
