import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, CardContent, Alert, MenuItem } from "@mui/material";

const RegisterForm = ({ onRegister, switchToLogin, registrationError }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onRegister) {
            await onRegister(formData);
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "50px" }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Register
                    </Typography>
                    {registrationError && <Alert severity="error">{registrationError}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        <TextField
                            select
                            label="Role"
                            name="role"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Instructor">Instructor</MenuItem>
                        </TextField>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </form>
                    <Button onClick={switchToLogin} color="secondary" fullWidth>
                        Back to Login
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RegisterForm;