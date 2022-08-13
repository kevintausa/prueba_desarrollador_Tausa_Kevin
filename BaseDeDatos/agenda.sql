-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-08-2022 a las 01:28:48
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `contact_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `contact_number` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `contact_type` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `contact_relationship` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(12) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`contact_id`, `contact_name`, `contact_number`, `contact_type`, `contact_relationship`, `user_id`) VALUES
(12, 'luisa', '111111', 'fijo', 'Familiar', '10033122'),
(13, 'sebastian', '222222', 'movil', 'Amigo', '10033122'),
(14, 'mauricio', '33333333', 'fijo', 'Compañero de trabajo', '10033122'),
(15, 'andrea vargas', '3456654', 'movil', 'Familiar', '1111111'),
(16, 'felipe contreras', '765456', 'movil', 'Compañero de trabajo', '1111111'),
(17, 'robin', '32432345', 'movil', 'Amigo', '222222'),
(18, 'sheldon C', '31416', 'movil', 'Compañero de trabajo', '222222');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `lastName`, `date`, `gender`) VALUES
('10033122', 'Betsy', 'Vargas', '1995-01-03', 'Femenino'),
('1111111', 'eduardo', 'casas', '1995-03-01', 'Masculino'),
('222222', 'kevin', 'tausa', '1999-01-01', 'Masculino');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
