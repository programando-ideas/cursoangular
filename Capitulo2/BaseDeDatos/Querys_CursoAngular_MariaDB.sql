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

/* Agregar nuevos clientes */
INSERT INTO curso_angular.clientes (nombre,apellido,fechadenacimiento) 
VALUES ('Cliente 4','Apellido 4','1980-01-01'),
	   ('Cliente 5','Apellido 5','1956-03-21'),
	   ('Cliente 6','Apellido 6','2000-01-01'),
	   ('Cliente 7','Apellido 7','1988-03-20'),
	   ('Cliente 8','Apellido 8','1946-01-01'),
	   ('Cliente 9','Apellido 9','1961-03-21'),
	   ('Cliente 10','Apellido 10','1962-01-01'),
	   ('Cliente 11','Apellido 11','1965-03-05'),
	   ('Cliente 12','Apellido 12','1989-01-01'),
	   ('Cliente 13','Apellido 13','1981-06-11'),
	   ('Cliente 14','Apellido 14','1980-01-01'),
	   ('Cliente 15','Apellido 15','1959-03-21'),
	   ('Cliente 16','Apellido 16','1989-01-01'),
	   ('Cliente 17','Apellido 17','1956-12-12'),
	   ('Cliente 18','Apellido 18','1980-01-01'),
	   ('Cliente 19','Apellido 19','1956-03-02'),
	   ('Cliente 20','Apellido 20','1980-01-15'),
	   ('Cliente 21','Apellido 21','1970-02-27');
