export const formatDate = (date) => {
    if (!date || date === '0000-12-31') return '';
    const d = new Date(date);
    const rc = d.toISOString().split('T')[0];
    if (rc === '0000-12-31') return '';
    return rc;
};

export const baseClientProfileEndPoint = 'ClientProfileInfo';
export const baseLessonEndPoint = 'api/v1/lessons';
export const navLessonInfo = 'lessoninfo';
export const navProfileInfo = 'profileinfo';
export const navInstructorInfo = 'instructorinfo';
export const baseInstructorProfileEndPoint='InstructorProfileInfo';

export const lessonTypes = {
    1: "None",
    2: "Freestyle",
    3: "Slalom",
    4: "GiantSlalom",
    5: "Downhill",
    6: "SuperG"
};

export const trainingLevels = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
    5: "Master"
};