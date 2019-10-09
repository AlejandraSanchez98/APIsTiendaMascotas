--Crear base de datos
CREATE DATABASE  tiendaMascotas;
--Usar la base de datos
USE tiendaMascotas;
--Creación de tablas

CREATE TABLE Categoria(
idCategoria  INT UNSIGNED AUTO_INCREMENT ,
nombreCategoria VARCHAR(100),
subCategoria VARCHAR(100),
descripcion VARCHAR(100),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idCategoria));

CREATE TABLE Proveedores(
idProveedor INT UNSIGNED AUTO_INCREMENT,
nombreProveedor VARCHAR(100),
direccionProveedor VARCHAR(100),
telefonoProveedor VARCHAR(100),
ciudadProveedor VARCHAR(100),
emailProveedor VARCHAR(100),
RFCProveedor VARCHAR(100),
razonSocial VARCHAR(100),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idProveedor));

CREATE TABLE Usuarios(
idUsuario INT UNSIGNED AUTO_INCREMENT,
nombreUsuario VARCHAR(100),
telefonoUsuario VARCHAR(100),
direccionUsuario VARCHAR(100),
correo VARCHAR(100),
passwordUsuario BLOB,
tipoUsuario VARCHAR(100),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idUsuario));

CREATE TABLE Compras(
idCompra INT UNSIGNED AUTO_INCREMENT,
montoSinIVA NUMERIC(7,2) UNSIGNED,
IVA NUMERIC(7,2) UNSIGNED,
montoConIVA NUMERIC(7,2) UNSIGNED,
estado TINYINT(5) DEFAULT 1,
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
idProveedor INT UNSIGNED NOT NULL,
idUsuario INT UNSIGNED NOT NULL,
PRIMARY KEY (idCompra),
FOREIGN KEY (idProveedor) REFERENCES Proveedores (idProveedor) ON DELETE CASCADE,
FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario) ON DELETE CASCADE );

CREATE TABLE Productos(
idProducto INT UNSIGNED AUTO_INCREMENT,
nombreProducto VARCHAR(100),
precioCompra NUMERIC(7,2) UNSIGNED,
precioVenta NUMERIC(7,2) UNSIGNED,
descripcionProducto VARCHAR(100),
stock INT UNSIGNED,
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
idCategoria INT UNSIGNED NOT NULL,
PRIMARY KEY (idProducto),
FOREIGN KEY (idCategoria) REFERENCES Categoria (idCategoria) ON DELETE CASCADE);


CREATE TABLE MetodoPago(
idMetodoPago INT UNSIGNED AUTO_INCREMENT,
tipoPago VARCHAR(100),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idMetodoPago));

CREATE TABLE Ventas(
idVenta INT UNSIGNED AUTO_INCREMENT,
montoSinIVA NUMERIC (7,2) UNSIGNED,
IVA NUMERIC (7,2) UNSIGNED,
montoConIVA NUMERIC(7,2) UNSIGNED,
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
idUsuario INT UNSIGNED NOT NULL,
PRIMARY KEY (idVenta),
FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario) ON DELETE CASCADE );

CREATE TABLE viaEnvio(
idViaEnvio INT  UNSIGNED AUTO_INCREMENT,
medioEnvio VARCHAR(100),
descripcion VARCHAR(250),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idViaEnvio));

CREATE TABLE Envios(
idEnvio INT UNSIGNED AUTO_INCREMENT,
direccion VARCHAR(100),
ciudad VARCHAR(100),
observaciones VARCHAR(100),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
idVenta INT UNSIGNED NOT NULL,
idViaEnvio INT UNSIGNED NOT NULL,
PRIMARY KEY (idEnvio),
FOREIGN KEY (idVenta) REFERENCES Ventas (idVenta) ON DELETE CASCADE,
FOREIGN KEY (idViaEnvio) REFERENCES viaEnvio (idViaEnvio) ON DELETE CASCADE);

CREATE TABLE Clientes
(idCliente INT UNSIGNED AUTO_INCREMENT,
nombreCliente VARCHAR(100),
direccionCliente VARCHAR(100),
ciudadCliente VARCHAR(100),
telefonoCliente VARCHAR(100),
emailCliente VARCHAR(100),
passwordCliente BLOB,
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idCliente));

CREATE TABLE tipoDevolucion(
idTipoDevolucion INT UNSIGNED AUTO_INCREMENT,
tipoDevolucion VARCHAR(250),
descripcion VARCHAR(250),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idTipoDevolucion));

CREATE TABLE Devoluciones(
idDevolucion INT UNSIGNED AUTO_INCREMENT,
montoSinIVA NUMERIC(7,2) UNSIGNED,
IVA NUMERIC(7,2) UNSIGNED,
montoConIVA NUMERIC(7,2) UNSIGNED,
motivoDevolucion VARCHAR(100),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
idCliente INT UNSIGNED NOT NULL,
idTipoDevolucion INT UNSIGNED NOT NULL,
idProducto INT UNSIGNED NOT NULL,
PRIMARY KEY (idDevolucion),
FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente) ON DELETE CASCADE,
FOREIGN KEY (idTipoDevolucion) REFERENCES tipoDevolucion (idTipoDevolucion) ON DELETE CASCADE,
FOREIGN KEY (idProducto) REFERENCES Productos (idProducto) ON DELETE CASCADE);


CREATE TABLE BitacoraAccesos(
idAcceso INT UNSIGNED AUTO_INCREMENT,
accion VARCHAR(100),
fechaRegistro DATETIME DEFAULT NOW(),
fechaActualizacion DATETIME DEFAULT NOW(),
estado TINYINT(5) DEFAULT 1,
idUsuario INT UNSIGNED NOT NULL, 
PRIMARY KEY (idAcceso),
FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario) ON DELETE CASCADE );


--Tablas de las relaciones
CREATE TABLE productos_ventas(
idProducto INT UNSIGNED NOT NULL,
idVenta INT UNSIGNED  NOT NULL,
cantidadProducto INT UNSIGNED,
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idProducto, idVenta),
FOREIGN KEY (idProducto) REFERENCES Productos (idProducto) ON DELETE CASCADE ,
FOREIGN KEY (idVenta) REFERENCES Ventas (idVenta) ON DELETE CASCADE);

CREATE TABLE productos_compras(
idProducto INT UNSIGNED NOT NULL,
idCompra INT UNSIGNED NOT NULL,
cantidadProducto INT UNSIGNED,
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idProducto,idCompra),
FOREIGN KEY (idProducto) REFERENCES Productos (idProducto) ON DELETE CASCADE ,
FOREIGN KEY (idCompra) REFERENCES Compras (idCompra) ON DELETE CASCADE);

CREATE TABLE ventas_clientes(
idVenta INT UNSIGNED NOT NULL,
idCliente INT UNSIGNED NOT NULL,
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idVenta, idCliente),
FOREIGN KEY (idVenta) REFERENCES Ventas (idVenta) ON DELETE CASCADE ,
FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente) ON DELETE CASCADE );

CREATE TABLE ventas_metodoPago(
idVenta INT UNSIGNED NOT NULL,
idMetodoPago INT UNSIGNED NOT NULL,
estado TINYINT(5) DEFAULT 1,
PRIMARY KEY (idVenta, idMetodoPago),
FOREIGN KEY (idVenta) REFERENCES Ventas (idVenta) ON DELETE CASCADE ,
FOREIGN KEY (idMetodoPago) REFERENCES MetodoPago (idMetodoPago) ON DELETE CASCADE );




--obtener el  Monto Total Ventas, Monto Total Compras y Utilidad
DELIMITER $$
CREATE PROCEDURE  Utilidad()
BEGIN
	SELECT SUM(montoConIVA) AS Total FROM Ventas WHERE estado=1;
    SELECT SUM(montoConIVA) AS Total FROM Compras WHERE estado=1;
    SELECT DISTINCT (SELECT SUM(montoConIVA) FROM Ventas WHERE estado=1)-(SELECT SUM(montoConIVA) FROM Compras WHERE estado=1) AS utilidad FROM Ventas, Compras;
END$$
CALL Utilidad();

DELIMITER $$
CREATE PROCEDURE  insertarCompra
(
	in montoSinIVA NUMERIC (7,2) UNSIGNED,
	in IVA NUMERIC (7,2) UNSIGNED ,
    in montoConIVA NUMERIC(7,2) UNSIGNED,
    in idProveedor INT UNSIGNED,
    in idUsuario INT UNSIGNED,
    in _idProducto INT UNSIGNED,
    in cantidadProducto INT UNSIGNED
)
BEGIN
	INSERT INTO Compras(montoSinIVA,IVA,montoConIVA,idProveedor, idUsuario) values(montoSinIVA,IVA,montoConIVA,idProveedor,idUsuario);
    INSERT INTO productos_compras(idProducto,idCompra,cantidadProducto) values(_idProducto,LAST_INSERT_ID(),cantidadProducto);
    UPDATE Productos SET stock = stock + cantidadProducto WHERE estado = 1 AND  idProducto=_idProducto;
END
$$




