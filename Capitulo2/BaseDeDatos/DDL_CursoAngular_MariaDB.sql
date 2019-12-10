CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del cliente.',
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre del cliente.',
  `apellido` varchar(100) NOT NULL COMMENT 'Apellido del cliente.',
  `fechadenacimiento` datetime NOT NULL COMMENT 'Fecha de nacimiento del cliente.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='Contiene la informacion de los clientes.'

CREATE TABLE `cli_telefonos` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Contiene las direcciones de los clientes.',
  `idcliente` int(11) NOT NULL COMMENT 'Identificador único del cliente.',
  `telefono` varchar(16) NOT NULL COMMENT 'Teléfono del clinte.',
  PRIMARY KEY (`id`),
  KEY `clitelefonos_fk` (`idcliente`),
  CONSTRAINT `clitelefonos_fk` FOREIGN KEY (`idcliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT COMMENT='Contiene los teléfonos de los clientes.'

CREATE TABLE `cli_direcciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Contiene las direcciones de los clientes.',
  `idcliente` int(11) NOT NULL COMMENT 'Identificador único del cliente.',
  `direccion` varchar(100) NOT NULL COMMENT 'Dirección del clinte.',
  PRIMARY KEY (`id`),
  KEY `clidirecciones_fk` (`idcliente`),
  CONSTRAINT `clidirecciones_fk` FOREIGN KEY (`idcliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT COMMENT='Contiene las direcciones de los clientes.'

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del usuario.',
  `usuario` varchar(100) NOT NULL COMMENT 'Identificador alfanumÃ©rico del usuario.',
  `nombres` varchar(100) NOT NULL COMMENT 'Nombre del usuario.',
  `apellidos` varchar(100) NOT NULL COMMENT 'Apellidos del usuario.',
  `password` varchar(1024) DEFAULT NULL COMMENT 'ContraseÃ±a',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT COMMENT='Contiene los datos de los usuarios del sistema.';

