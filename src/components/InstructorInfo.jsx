import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Radio,
    RadioGroup,
    Checkbox,
    Grid
} from "@mui/material";
import {axiosProfileService} from "../axiosConfig";
import {baseInstructorProfileEndPoint, formatDate, formatDateTime} from "./utils";

const InstructorInfo = ({
                            open,
                            handleClose,
                            onSuccess,
                            mode,
                            id
                        }) => {
    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        patronymic: "",
        birthDate: "",
        gender: 1,
        phoneNumber: "",
        email: "",
        telegramName: "",
        hireDate: "",
        dateDismissal: "",
        isActive: true,
        isDeleted: false
    });

    useEffect(() => {
        console.log("InstructorInfo id:", id);
        if ((mode === "edit" || mode === "view") && id) {
            axiosProfileService.get(`/${baseInstructorProfileEndPoint}?userid=${id}`)
                .then(res => {
                    const d = res.data;
                    setFormData({
                        surname: d.surname || "",
                        name: d.name || "",
                        patronymic: d.patronymic || "",
                        birthDate: formatDate(d.birthDate) || "",
                        gender: d.gender || 1,
                        phoneNumber: d.phoneNumber || "",
                        email: d.email || "",
                        telegramName: d.telegramName || "",
                        hireDate: formatDate(d.hireDate) || "",
                        dateDismissal: formatDate(d.dateDismissal) || "",
                        isActive: d.isActive,
                        isDeleted: d.isDeleted
                    });
                });
        }
    }, [open, mode, id]);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;
        console.log("handleChange", name, value, type, checked);
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            //[name]: name === "gender" ? (value === "Male" ? 1 : 2) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            birthDate: formatDateTime(formData.birthDate),
            hireDate: formatDateTime(formData.hireDate),
            dateDismissal: formatDateTime(formData.dateDismissal),
            isActive: formData.isActive,
            isDeleted: formData.isDeleted,
            gender: formData.gender==="2" ? 2 : 1,
        };
        console.log("handleSubmit", formattedData);
        try {
            const method = mode === "edit" ? "put" : "post";
            const url = mode === "edit"
                ? `/${baseInstructorProfileEndPoint}?userid=${id}`
                : `/${baseInstructorProfileEndPoint}`;
            await axiosProfileService({method, url, data: formattedData});
            await axiosProfileService.put(`/${baseInstructorProfileEndPoint}/confirmСhanges?userid=${id}&profileStatus=3`);
            onSuccess(mode === "edit" ? "Instructor updated successfully" : "Instructor created successfully");
            handleClose();
        } catch (error) {
            console.error("Error saving instructor:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{mode === "edit" ? "Edit Instructor" : "Create Instructor"}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {["surname", "name", "patronymic", "phoneNumber", "email", "telegramName"].map(field => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                fullWidth
                                size="small"
                                name={field}
                                label={field[0].toUpperCase() + field.slice(1)}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        </Grid>
                    ))}

                    {["birthDate", "hireDate", "dateDismissal"].map(field => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                fullWidth
                                size="small"
                                type="date"
                                name={field}
                                label={field.replace(/([A-Z])/g, ' $1')}
                                value={formData[field]}
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                            <FormControlLabel value={1} control={<Radio/>} label="Male"/>
                            <FormControlLabel value={2} control={<Radio/>} label="Female"/>
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={formData.isActive} name="isActive" onChange={handleChange}/>}
                            label="Active"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{padding: 2}}>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
            </DialogActions>
        </Dialog>
    );
};

export default InstructorInfo;
