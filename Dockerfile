# Используем Nginx
FROM nginx:alpine

# Копируем билд в папку для статики
COPY build/ /usr/share/nginx/html

# Копируем наш конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf
