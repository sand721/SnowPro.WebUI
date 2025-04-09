import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import LessonInfo from "./LessonInfo";

const LessonInfoPopup = ({ open, onClose, mode, id }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{mode === "edit" ? "Edit Lesson" : "Create Lesson"}</DialogTitle>
            <DialogContent dividers>
                <LessonInfo mode={mode} id={id} onClose={onClose} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LessonInfoPopup;
