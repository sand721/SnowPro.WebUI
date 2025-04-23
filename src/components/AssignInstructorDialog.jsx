import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    TextField,
} from "@mui/material";
import {axiosLessonService, axiosProfileService} from "../axiosConfig";
import {baseInstructorProfileEndPoint, baseLessonEndPoint} from "./utils";
const { NIL } = require('uuid');
const AssignInstructorDialog = ({open, lessonId, onClose, onSuccess, currentInstructorId}) => {
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructorId, setSelectedInstructorId] = useState("");

    useEffect(() => {
        console.log("AssignInstructorDialog:", currentInstructorId);
        if (!lessonId) return
        axiosProfileService
            .get(`/${baseInstructorProfileEndPoint}/list?page=1&itemsPerPage=20`)
            .then((res) => {
                const list = res.data || []
                if (currentInstructorId && list.some(inst => inst.userId === currentInstructorId)) {
                    setSelectedInstructorId(currentInstructorId);
                    console.log("InstructorId found in the list")
                } else {
                    setSelectedInstructorId("");
                    console.log("InstructorId found in the list")
                }
                // Добавляем пункт "Без инструктора"
                const listWithEmpty = [
                    { userId: NIL, name: "— Без инструктора —" },
                    ...list,
                ];

                setInstructors(listWithEmpty);
                //setInstructors(list);

            })
            .catch((err) => console.error(err));
        //console.log(instructors)

    }, [lessonId]);

    const handleAssign = () => {
        if (!selectedInstructorId) return;
        if (selectedInstructorId !== NIL) {
            axiosLessonService.post(`/${baseLessonEndPoint}/instructor`, {
                instructorId: selectedInstructorId,
                lessonId: lessonId,
            })
                .then(() => {
                    onClose("Instructor assigned successfully");
                })
                .catch((err) => {
                    console.error(err);
                    onClose();
                });
        }
        else {
            axiosLessonService.delete(`/${baseLessonEndPoint}/instructor/${lessonId}`)
                .then(() => {
                    onClose("Instructor unassigned successfully");
                })
                .catch((err) => {
                    console.error(err);
                    onClose();
                });
        }
    };
    //console.log({open})
    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    m: "auto", // центровка по горизонтали
                },
            }}
        >
            <DialogTitle>Assign Instructor {currentInstructorId ? `#${currentInstructorId}` : ''} </DialogTitle>
            <DialogContent>
                <TextField
                    select
                    fullWidth
                    label="Instructor"
                    value={selectedInstructorId}
                    onChange={(e) => setSelectedInstructorId(e.target.value)}
                    sx={{mt: 2}}
                >
                    {instructors.map((inst) => (
                        <MenuItem key={inst.userId} value={inst.userId}>
                            {inst.surname} {inst.name} {inst.patronymic}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAssign} variant="contained">Assign</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignInstructorDialog;
