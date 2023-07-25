-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-07-2023 a las 07:39:25
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
-- Base de datos: `prestamo_libros_inacap`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encargado`
--

CREATE TABLE `encargado` (
  `id_encargado` int(11) NOT NULL,
  `nombre_usuario` varchar(40) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `id_libro` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL,
  `titulo` varchar(90) NOT NULL,
  `autor` varchar(60) NOT NULL,
  `editorial` varchar(60) NOT NULL,
  `anio_publicacion` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int(11) NOT NULL,
  `fecha_inicio` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_devolucion` datetime DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_encargado` int(11) NOT NULL,
  `multa_total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo_libros`
--

CREATE TABLE `prestamo_libros` (
  `id_prestamo_libros` int(11) NOT NULL,
  `id_prestamo` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prorroga`
--

CREATE TABLE `prorroga` (
  `prorroga_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_termino` date NOT NULL,
  `pretamo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE `stock` (
  `ISBN` varchar(60) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `docente` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encargado`
--
ALTER TABLE `encargado`
  ADD PRIMARY KEY (`id_encargado`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`id_libro`),
  ADD KEY `ISBN` (`ISBN`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_encargado` (`id_encargado`);

--
-- Indices de la tabla `prestamo_libros`
--
ALTER TABLE `prestamo_libros`
  ADD PRIMARY KEY (`id_prestamo_libros`),
  ADD KEY `id_prestamo` (`id_prestamo`),
  ADD KEY `id_libro` (`id_libro`);

--
-- Indices de la tabla `prorroga`
--
ALTER TABLE `prorroga`
  ADD PRIMARY KEY (`prorroga_id`),
  ADD UNIQUE KEY `pretamo_id` (`pretamo_id`);

--
-- Indices de la tabla `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`ISBN`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encargado`
--
ALTER TABLE `encargado`
  MODIFY `id_encargado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prestamo_libros`
--
ALTER TABLE `prestamo_libros`
  MODIFY `id_prestamo_libros` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prorroga`
--
ALTER TABLE `prorroga`
  MODIFY `prorroga_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `stock` (`ISBN`);

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`id_encargado`) REFERENCES `encargado` (`id_encargado`),
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `prestamo_libros`
--
ALTER TABLE `prestamo_libros`
  ADD CONSTRAINT `prestamo_libros_ibfk_1` FOREIGN KEY (`id_libro`) REFERENCES `libro` (`id_libro`),
  ADD CONSTRAINT `prestamo_libros_ibfk_2` FOREIGN KEY (`id_prestamo`) REFERENCES `prestamo` (`id_prestamo`);

--
-- Filtros para la tabla `prorroga`
--
ALTER TABLE `prorroga`
  ADD CONSTRAINT `prorroga_ibfk_1` FOREIGN KEY (`pretamo_id`) REFERENCES `prestamo` (`id_prestamo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
