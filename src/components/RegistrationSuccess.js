import React from "react";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";

const RegistrationSuccess = ({ onBackToLogin }) => {
    return (
        <Container maxWidth="xs" style={{ marginTop: "50px" }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Registration Successful!
                    </Typography>
                    <Typography align="center" gutterBottom>
                        You can now log in using your credentials.
                    </Typography>
                    <Button onClick={onBackToLogin} variant="contained" color="primary" fullWidth>
                        Back to Login
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RegistrationSuccess;
