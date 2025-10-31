-- Script para crear la base de datos y tabla de incidencias
-- Ejecutar desde phpMyAdmin (http://localhost:8080/phpmyadmin/) o desde la consola MySQL

CREATE DATABASE IF NOT EXISTS `crud_soporte` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `crud_soporte`;

CREATE TABLE IF NOT EXISTS `incidents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` VARCHAR(50) NOT NULL DEFAULT 'abierta',
  `customer_name` VARCHAR(255),
  `customer_phone` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar datos de ejemplo (opcional)
INSERT INTO `incidents` (`title`, `description`, `status`, `customer_name`, `customer_phone`) VALUES
('Sin conexión a internet', 'Cliente reporta que no tiene acceso a internet desde hace 2 horas', 'abierta', 'Juan Pérez', '555-0001'),
('Velocidad lenta', 'La velocidad de navegación es muy lenta, solo llega a 10Mbps cuando contrató 100Mbps', 'en_progreso', 'María González', '555-0002'),
('Router no enciende', 'El router no enciende después de un corte de luz', 'abierta', 'Carlos Ramírez', '555-0003');
