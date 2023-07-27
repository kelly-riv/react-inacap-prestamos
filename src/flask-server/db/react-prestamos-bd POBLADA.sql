-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2023 a las 03:11:20
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

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
  `nombre_usuario` varchar(50) NOT NULL,
  `password` varchar(260) NOT NULL,
  `rut` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encargado`
--

INSERT INTO `encargado` (`id_encargado`, `nombre_usuario`, `password`, `rut`) VALUES
(1, 'kelly_rivera', '872059ee9abf7170f74f41b33e41830d', '20.975.953-5'),
(2, 'osvaldo_diaz', '3357c47fbc3568310e61b800043938fa', '21.439.593-2'),
(3, 'axel_mondaca', 'a4db14c0e16bff27a1b402aad65bc21e', '20.247.757-7');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `id_libro` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `ISBN` varchar(40) NOT NULL,
  `disponibilidad` tinyint(4) NOT NULL DEFAULT 1,
  `condicion` tinyint(4) NOT NULL DEFAULT 0,
  `anio_publicacion` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`id_libro`, `titulo`, `autor`, `editorial`, `ISBN`, `disponibilidad`, `condicion`, `anio_publicacion`) VALUES
(2, 'Las aventuras de Amanda y el gato del pirata', 'Flores Guerra, Lilian', 'Seminarios, Eventos y Publicaciones Lilian Verónica Flores Guerra EIRL - Ediciones del Gato', '978-956-09719-5-1', 0, 0, 2023),
(3, 'Ladrido inverso', 'Azzar, Ernesto', 'Un Perro Negro SPA - Ediciones Askasis', '978-956-9455-52-0', 0, 0, 2023),
(4, 'El amor por los débiles & el instinto de asesinato', 'Axat, Julián', 'Un Perro Negro SPA - Ediciones Askasis', '978-956-9455-51-3', 1, 0, 2023),
(5, 'Hijo de la guerra, hombre de paz', 'Ban, Ki-monn', 'Pontificia Universidad Católica de Chile', '978-956-14-3003-7', 0, 0, 2022),
(6, 'Sofía y el cerro de los deseos', 'Aragón, María-José', 'Seminarios, Eventos y Publicaciones Lilian Verónica Flores Guerra EIRL - Ediciones del Gato', '978-956-09719-3-7', 1, 0, 2022),
(7, 'Hijo de la guerra, hombre de paz', 'Ban, Ki-monn', 'Pontificia Universidad Católica de Chile', '978-956-14-3003-7', 0, 0, 2022),
(8, 'Sofía y el cerro de los deseos', 'Aragón, María-José', 'Seminarios, Eventos y Publicaciones Lilian Verónica Flores Guerra EIRL - Ediciones del Gato', '978-956-09719-3-7', 1, 0, 2022),
(9, 'Medallas y recompensas en La Guerra del Pacífico', 'Fabián Berríos', 'Inversiones Elemonkey SpA.', '978-956-6211-02-0', 0, 0, 2022),
(10, 'Medallas y recompensas en La Guerra del Pacífico', 'Fabián Berríos', 'Inversiones Elemonkey SpA.', '978-956-6211-02-0', 1, 0, 2022),
(11, 'Medallas y recompensas en La Guerra del Pacífico', 'Fabián Berríos', 'Inversiones Elemonkey SpA.', '978-956-6211-02-0', 1, 0, 2022),
(12, 'Los anarquistas y el movimiento obrero', 'Grez Toso, Sergio Santiago', 'LOM Ediciones S.A.', '978-956-00-1555-6', 1, 0, 2007),
(13, 'Los anarquistas y el movimiento obrero', 'Grez Toso, Sergio Santiago', 'LOM Ediciones S.A.', '978-956-00-1555-6', 1, 0, 2007),
(14, 'Los anarquistas y el movimiento obrero', 'Grez Toso, Sergio Santiago', 'LOM Ediciones S.A.', '978-956-00-1555-6', 1, 0, 2007),
(15, 'Nadar a oscuras', 'García-Huidobro Moroder, María Beatríz', 'LOM Ediciones S.A.', '978-956-00-1536-5', 0, 0, 2007),
(16, 'Nadar a oscuras', 'García-Huidobro Moroder, María Beatríz', 'LOM Ediciones S.A.', '978-956-00-1536-5', 0, 0, 2007),
(17, 'Refranes y + con alma', 'Gómez Alfonso, María del Rosario', 'Editorial Por Un Mundo Mejor Ltda.', '978-956-8234-14-0', 0, 0, 2007);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_termino` date NOT NULL,
  `id_encargado` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL,
  `multa_total` int(11) NOT NULL DEFAULT 0,
  `fecha_entrega` date DEFAULT NULL,
  `entregado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id_prestamo`, `fecha_inicio`, `fecha_termino`, `id_encargado`, `id_user`, `id_libro`, `multa_total`, `fecha_entrega`, `entregado`) VALUES
(40, '2023-07-26', '2023-07-28', 2, 1, 2, 0, NULL, 0),
(41, '2023-07-26', '2023-08-03', 2, 2, 17, 0, NULL, 0),
(42, '2023-07-27', '2023-08-04', 2, 3, 5, 0, NULL, 0),
(43, '2023-07-26', '2023-07-30', 2, 4, 7, 0, NULL, 0),
(44, '2023-07-28', '2023-07-29', 2, 5, 15, 0, NULL, 0),
(45, '2023-07-29', '2023-08-08', 2, 6, 16, 0, NULL, 0),
(46, '2023-07-26', '2023-08-06', 2, 7, 3, 0, NULL, 0),
(47, '2023-07-28', '2023-07-29', 2, 8, 9, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prorroga`
--

CREATE TABLE `prorroga` (
  `id_prorroga` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_termino` date NOT NULL,
  `prestamo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE `stock` (
  `ISBN` varchar(40) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `stock`
--

INSERT INTO `stock` (`ISBN`, `cantidad`) VALUES
('978-956-00-1536-5', 1),
('978-956-00-1555-6', 1),
('978-956-09719-3-7', 2),
('978-956-09719-5-1', 1),
('978-956-14-3003-7', 2),
('978-956-6211-02-0', 3),
('978-956-8234-14-0', 1),
('978-956-9455-51-3', 2),
('978-956-9455-52-0', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_user` int(11) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `email` varchar(90) NOT NULL,
  `docente` tinyint(4) NOT NULL DEFAULT 0,
  `telefono` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_user`, `rut`, `nombre`, `email`, `docente`, `telefono`) VALUES
(1, '12.345.678-9', 'Claudio Flavio', 'cflavio@mail.com', 0, '+56909673865'),
(2, '15.835.534-5', 'Javiera Ávila', 'javila@mail.com', 1, '+56937184963'),
(3, '19.374.638-9', 'Tamara Violeta', 'tvioleta@mail.com', 1, '+56948273946'),
(4, '20.463.136-8', 'Candice Thompson', 'cthompson@mail.com', 0, '+56983274938'),
(5, '21.374.283-4', 'David Calles', 'dcalles@mail.com', 0, '+56937294738'),
(6, '17.367.924-k', 'Ramón Valdebenito', 'rvaldebenito@mail.com', 1, '+56993478329'),
(7, '13.374.293-3', 'Mauricio Palavecino', 'mpalavecino@mail.com', 1, '+56938921738'),
(8, '20.834.672-4', 'Nicole Fajardo', 'nfajardo@mail.com', 0, '+56927381940'),
(9, '21.436.384-5', 'Clemente Rojas', 'crojas@mail.com', 0, '+56983013992'),
(10, '21.483.573-2', 'Cardenal Alamos', 'calamos@mail.com', 0, '+56929642738'),
(11, '10.323.342-4', 'Vicencio Andrómedo', 'vandromedo@mail.com', 1, '+56939284729'),
(12, '15.237.342-9', 'Juan Gávila', 'jgavila@mail.com', 1, '+56938297583'),
(13, '21.943.174-k', 'Sandra Vázquez', 'svazquez@mail.com', 0, '+56927381923'),
(14, '18.372.348-0', 'Camila Contreras', 'ccontreras@mail.com', 0, '+56938293829'),
(15, '17.283.284-8', 'Christian Silva', 'csilva@mail.com', 0, '+56938294839'),
(16, '15.384.293-9', 'Francisco Hidalgo', 'fhidalgo@mail.com', 0, '+56967489302');

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
  ADD KEY `id_encargado` (`id_encargado`,`id_user`,`id_libro`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_libro` (`id_libro`);

--
-- Indices de la tabla `prorroga`
--
ALTER TABLE `prorroga`
  ADD PRIMARY KEY (`id_prorroga`),
  ADD KEY `prestamo_id` (`prestamo_id`);

--
-- Indices de la tabla `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`ISBN`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_user`);

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
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `prorroga`
--
ALTER TABLE `prorroga`
  MODIFY `id_prorroga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`),
  ADD CONSTRAINT `prestamo_ibfk_3` FOREIGN KEY (`id_libro`) REFERENCES `libro` (`id_libro`);

--
-- Filtros para la tabla `prorroga`
--
ALTER TABLE `prorroga`
  ADD CONSTRAINT `prorroga_ibfk_1` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamo` (`id_prestamo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
