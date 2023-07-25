-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2023 a las 01:59:59
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
-- Base de datos: `react-prestamos-bd`
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

--
-- Volcado de datos para la tabla `encargado`
--

INSERT INTO `encargado` (`id_encargado`, `nombre_usuario`, `rut`, `password`) VALUES
(1, 'kelly_rivera', '20.975.953-5', 'kelly123'),
(2, 'osvaldo_diaz', '21.439.593-2', 'osvaldo123'),
(3, 'axel_mondaca', '20.247.757-7', 'axel123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `id_libro` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `anio_publicacion` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`id_libro`, `ISBN`, `titulo`, `autor`, `editorial`, `anio_publicacion`) VALUES
(2, '978-956-09719-5-1', 'Las aventuras de Amanda y el gato del pirata', 'Flores Guerra, Lilian', 'Seminarios, Eventos y Publicaciones Lilian Verónica Flores Guerra EIRL - Ediciones del Gato', 2023),
(3, '978-956-9455-52-0', 'Ladrido inverso', 'Azzar, Ernesto', 'Un Perro Negro SPA - Ediciones Askasis', 2023),
(4, '978-956-9455-51-3', 'El amor por los débiles & el instinto de asesinato', 'Axat, Julián', 'Un Perro Negro SPA - Ediciones Askasis', 2023),
(5, '978-956-14-3003-7', 'Hijo de la guerra, hombre de paz', 'Ban, Ki-monn', 'Pontificia Universidad Católica de Chile', 2022),
(6, '978-956-09719-3-7', 'Sofía y el cerro de los deseos', 'Aragón, María-José', 'Seminarios, Eventos y Publicaciones Lilian Verónica Flores Guerra EIRL - Ediciones del Gato', 2022),
(7, '978-956-14-3003-7', 'Hijo de la guerra, hombre de paz', 'Ban, Ki-monn', 'Pontificia Universidad Católica de Chile', 2022),
(8, '978-956-09719-3-7', 'Sofía y el cerro de los deseos', 'Aragón, María-José', 'Seminarios, Eventos y Publicaciones Lilian Verónica Flores Guerra EIRL - Ediciones del Gato', 2022),
(9, '978-956-6211-02-0', 'Medallas y recompensas en La Guerra del Pacífico', 'Fabián Berríos', 'Inversiones Elemonkey SpA.', 2022),
(10, '978-956-6211-02-0', 'Medallas y recompensas en La Guerra del Pacífico', 'Fabián Berríos', 'Inversiones Elemonkey SpA.', 2022),
(11, '978-956-6211-02-0', 'Medallas y recompensas en La Guerra del Pacífico', 'Fabián Berríos', 'Inversiones Elemonkey SpA.', 2022),
(12, '978-956-00-1555-6', 'Los anarquistas y el movimiento obrero', 'Grez Toso, Sergio Santiago', 'LOM Ediciones S.A.', 2007),
(13, '978-956-00-1555-6', 'Los anarquistas y el movimiento obrero', 'Grez Toso, Sergio Santiago', 'LOM Ediciones S.A.', 2007),
(14, '978-956-00-1555-6', 'Los anarquistas y el movimiento obrero', 'Grez Toso, Sergio Santiago', 'LOM Ediciones S.A.', 2007),
(15, '978-956-00-1536-5', 'Nadar a oscuras', 'García-Huidobro Moroder, María Beatríz', 'LOM Ediciones S.A.', 2007),
(16, '978-956-00-1536-5', 'Nadar a oscuras', 'García-Huidobro Moroder, María Beatríz', 'LOM Ediciones S.A.', 2007),
(17, '978-956-8234-14-0', 'Refranes y + con alma', 'Gómez Alfonso, María del Rosario', 'Editorial Por Un Mundo Mejor Ltda.', 2007);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL DEFAULT current_timestamp(),
  `fecha_devolucion` date DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_encargado` int(11) NOT NULL,
  `multa_total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id_prestamo`, `fecha_inicio`, `fecha_devolucion`, `id_user`, `id_encargado`, `multa_total`) VALUES
(1, '2023-07-22', '2023-07-20', 1, 2, NULL),
(2, '2023-07-22', '2023-07-18', 12, 3, NULL),
(3, '2023-07-22', '2023-07-31', 8, 1, NULL),
(4, '2023-07-13', '2023-07-23', 1, 1, NULL),
(5, '2023-07-13', '2023-07-26', 1, 1, NULL),
(6, '2023-07-06', '2023-07-13', 1, 1, NULL),
(7, '2023-07-20', '2023-07-25', 1, 1, NULL),
(13, '2023-07-12', '2023-07-25', 1, 1, NULL),
(14, '2023-07-05', '2023-07-25', 1, 1, NULL),
(15, '2023-07-06', '2023-07-13', 1, 1, NULL),
(16, '2023-07-12', '2023-07-15', 1, 1, NULL),
(17, '2023-07-05', '2023-07-23', 1, 1, NULL),
(18, '2023-07-14', '2023-07-23', 1, 1, NULL),
(19, '2023-07-05', '2023-07-26', 1, 1, NULL),
(20, '2023-07-05', '2023-07-26', 1, 1, NULL),
(21, '2023-07-13', '2023-07-19', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo_libros`
--

CREATE TABLE `prestamo_libros` (
  `id_prestamo_libros` int(11) NOT NULL,
  `id_prestamo` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prestamo_libros`
--

INSERT INTO `prestamo_libros` (`id_prestamo_libros`, `id_prestamo`, `id_libro`) VALUES
(1, 1, 6),
(2, 1, 9),
(3, 2, 5),
(4, 3, 4),
(5, 3, 11),
(6, 3, 2),
(7, 16, 4),
(8, 17, 4),
(9, 17, 14),
(10, 18, 4),
(11, 18, 9),
(12, 18, 17),
(13, 18, 6),
(14, 19, 5),
(15, 19, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prorroga`
--

CREATE TABLE `prorroga` (
  `prorroga_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_termino` date NOT NULL,
  `prestamo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE `stock` (
  `ISBN` varchar(60) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `stock`
--

INSERT INTO `stock` (`ISBN`, `cantidad`) VALUES
('978-956-00-1536-5', 2),
('978-956-00-1555-6', 3),
('978-956-09719-3-7', 2),
('978-956-09719-5-1', 1),
('978-956-14-3003-7', 2),
('978-956-6211-02-0', 3),
('978-956-8234-14-0', 1),
('978-956-9455-51-3', 1),
('978-956-9455-52-0', 1);

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
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `rut`, `nombre`, `telefono`, `email`, `docente`) VALUES
(1, '12.345.678-9', 'Claudio Flavio', '+56909673865', 'cflavio@mail.com', 0),
(2, '15.835.534-5', 'Javiera Ávila', '+56937184963', 'javila@mail.com', 1),
(3, '19.374.638-9', 'Tamara Violeta', '+56948273946', 'tvioleta@mail.com', 1),
(4, '20.463.136-8', 'Candice Thompson', '+56983274938', 'cthompson@mail.com', 0),
(5, '21.374.283-4', 'David Calles', '+56937294738', 'dcalles@mail.com', 0),
(6, '17.367.924-k', 'Ramón Valdebenito', '+56993478329', 'rvaldebenito@mail.com', 1),
(7, '13.374.293-3', 'Mauricio Palavecino', '+56938921738', 'mpalavecino@mail.com', 1),
(8, '20.834.672-4', 'Nicole Fajardo', '+56927381940', 'nfajardo@mail.com', 0),
(9, '21.436.384-5', 'Clemente Rojas', '+56983013992', 'crojas@mail.com', 0),
(10, '21.483.573-2', 'Cardenal Alamos', '+56929642738', 'calamos@mail.com', 0),
(11, '10.323.342-4', 'Vicencio Andrómedo', '+56939284729', 'vandromedo@mail.com', 1),
(12, '15.237.342-9', 'Juan Gávila', '+56938297583', 'jgavila@mail.com', 1),
(13, '21.943.174-k', 'Sandra Vázquez', '+56927381923', 'svazquez@mail.com', 0),
(14, '18.372.348-0', 'Camila Contreras', '+56938293829', 'ccontreras@mail.com', 0),
(15, '17.283.284-8', 'Christian Silva', '+56938294839', 'csilva@mail.com', 0),
(16, '15.384.293-9', 'Francisco Hidalgo', '+56967489302', 'fhidalgo@mail.com', 0);

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
  ADD UNIQUE KEY `pretamo_id` (`prestamo_id`);

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
  MODIFY `id_encargado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `prestamo_libros`
--
ALTER TABLE `prestamo_libros`
  MODIFY `id_prestamo_libros` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `prorroga`
--
ALTER TABLE `prorroga`
  MODIFY `prorroga_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
  ADD CONSTRAINT `prorroga_ibfk_1` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamo` (`id_prestamo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
