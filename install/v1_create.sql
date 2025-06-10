-- Создаём базу данных (если её ещё нет)
CREATE DATABASE IF NOT EXISTS MySiteDB
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Используем созданную БД
USE MySiteDB;

-- Таблица users (пользователи)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица articles (статьи)
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),             -- Путь к изображению (можно NULL)
    date DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Дата создания (автоматически)
    tag VARCHAR(50),                 -- Тег статьи (например, "программирование")
    title VARCHAR(255) NOT NULL,     -- Заголовок (обязательное поле)
    text TEXT                        -- Текст статьи (длинный текст)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;