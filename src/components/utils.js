export const formatDate = (date) => {
    if (!date || date === '0000-12-31') return '';
    const d = new Date(date);
    const rc = d.toISOString().split('T')[0];
    if (rc === '0000-12-31') return '';
    return rc;
};
export const formatDateTime = (dateTime) => {
    return dateTime ? formatDate(dateTime) + 'T00:00:00.000000Z' : null;
}
export const formatTime = (dateTime) => {
    if (!dateTime) return '';
    const d = new Date(dateTime);
    return d.toISOString().split('T')[1].slice(0, 5); // Извлекаем HH:MM
};

export const getUserToken = () => {
    const userString = localStorage.getItem("user"); // Получаем строку

    let user = null;
    try {
        user = JSON.parse(userString); // Преобразуем строку в объект
    } catch (error) {
        console.error("Ошибка парсинга user из localStorage:", error);
    }
    if (user && user.token) {
        return user.token
    }
};

export const baseClientProfileEndPoint = 'api/ClientProfileInfo';
export const baseLessonEndPoint = 'api/v1/lessons';
export const navLessonInfo = 'lessoninfo';
export const navProfileInfo = 'profileinfo';
export const navInstructorInfo = 'instructorinfo';
export const navDashboard = 'dashboard';
export const baseInstructorProfileEndPoint='api/InstructorProfileInfo';

export const lessonTypes = {
    0: "None",
    1: "SuperG",
    2: "Freestyle",
    3: "Slalom",
    4: "GiantSlalom",
    5: "Downhill"
};

export const trainingLevels = {
    0: "None",
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
    5: "Master"
};
//export const baseLessonEndPoint = "lesson";