# CRUD Soporte - Proyecto ejemplo

Este proyecto es un CRUD sencillo para registrar incidencias de soporte de una compañía de internet.

Tecnologías usadas:
- Backend: Node.js + Express
- Base de datos: MySQL (uso con XAMPP)
- Frontend: React (Vite) + CSS

Estructura creada:
- `server/` — API Express que se conecta a MySQL
- `client/` — UI React con Vite

Pasos rápidos (resumen):
1. Instala XAMPP y arranca Apache + MySQL.
2. Crea una base de datos y tabla (SQL más abajo).
3. Configura `server/.env` con las credenciales de MySQL (o edita `server/db.js`).
4. En dos terminales: instalar dependencias y ejecutar:
   - Backend:
     cd server; npm install; npm install bcryptjs; npm run start
     
node server.js

   - Frontend:
     cd client; npm install; npm run dev

SQL para crear la base y tabla (ejecutar en phpMyAdmin o consola MySQL):

CREATE DATABASE IF NOT EXISTS `crud_soporte` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `crud_soporte`;

CREATE TABLE `incidents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` VARCHAR(50) NOT NULL DEFAULT 'abierta',
  `customer_name` VARCHAR(255),
  `customer_phone` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Notas importantes:
- XAMPP suele usar `root` sin contraseña en entornos locales; si es así, puedes dejar password vacía.
- Revisa `server/.env.example` y copia a `.env` con tus valores.
