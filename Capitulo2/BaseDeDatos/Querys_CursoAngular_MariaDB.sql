use curso_angular;

DELETE FROM cli_direcciones;
DELETE FROM cli_telefonos;
DELETE FROM clientes;

ALTER TABLE clientes AUTO_INCREMENT=1;
ALTER TABLE cli_telefonos AUTO_INCREMENT=1;
ALTER TABLE cli_direcciones AUTO_INCREMENT=1;

INSERT INTO curso_angular.clientes (nombre,apellido,fechadenacimiento) 
VALUES ('Cliente 1','Apellido 1','1980-01-01'),
	   ('Cliente 2','Apellido 2','1956-03-21');

/*Cliente 1*/
INSERT INTO cli_telefonos (idcliente, telefono)
VALUES (1, '1111111111'),
       (1, '2222222222');

INSERT INTO cli_direcciones (idcliente, direccion)
VALUES (1, 'Calle 1 #455'),
	   (1, 'Avenida San Juan #2334 piso 3 depto. 5'),
	   (1, 'Calle 45 #1123');

/*Cliente 2*/
INSERT INTO cli_telefonos (idcliente, telefono)
VALUES (2, '3334445556'),
       (2, '5558887774');

INSERT INTO cli_direcciones (idcliente, direccion)
VALUES (2, 'Calle 28 #1234');
