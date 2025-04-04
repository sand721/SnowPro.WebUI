import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL, LOGIN_ENDPOINT } from "../config";

const AuthForm = ({ switchToRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/dashboard");
            } else {
                setError(data.error || "Login failed");
            }
        } catch (error) {
            setError("An unexpected error occurred.");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "50px" }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                    <Button onClick={switchToRegister} color="secondary" fullWidth>
                        Register
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AuthForm;
