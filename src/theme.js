// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#bcbcbc',   // фон ячеек заголовка таблицы
                    fontWeight: 'bold',          // жирный текст
                    color: '#333',               // цвет текста
                    textAlign: 'center', // выравнивание текста по центру
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                head: {
                    height: 60,                // 🟦 Высота строки заголовка
                },
                body: {
                    height: 48,                // 🟨 Высота обычной строки
                },
            },
        },
    },
});

export default theme;
