/*modifique los estados y las fechas de las tablas - pendiente modificar la relacion de metodo de pago*/
/*Modificar en el postman las tablas: envios,clientes,usuarios,productos,metodoPago,accesos*/
--Crear base de datos
create database  tiendaMascotas;
--Usar la base de datos
use tiendaMascotas;
--Creación de tablas

/*create table Categoria(
idCategoria  int auto_increment,
nombreCategoria varchar(50),
subCategoria varchar(50),
descripcion varchar(100),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (idCategoria));

create table Proveedores(
idProveedor int auto_increment,
nombreProveedor varchar(50),
direccionProveedor varchar(50),
telefonoProveedor int(10),
ciudadProveedor varchar(20),
emailProveedor varchar(30),
RFCProveedor varchar(15),
razonSocial varchar(100),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (idProveedor));

create table Vendedores(
idVendedor int auto_increment,
nombreVendedor varchar(50),
emailVendedor varchar(30),
telefonoVendedor int(10),
direccionVendedor varchar(50),
ciudadVendedor varchar(20),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (idVendedor));

create table Usuarios(
idUsuario int auto_increment,
nombreUsuario varchar(30),
correo varchar(100),
passwordUsuario BLOB,
tipoUsuario varchar(20),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idVendedor int,
primary key (idUsuario, idVendedor),
foreign key (idVendedor) references Vendedores (idVendedor));

create table Compras(
idCompra int auto_increment,
montoSinIVA numeric (6,2),
IVA numeric (6,2),
montoConIVA numeric(6,2),
estado tinyint(2) default 1,
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
idProveedor int,
idUsuario int,
numReporte int,
primary key (idCompra, idProveedor, idUsuario, numReporte),
foreign key (idProveedor) references Proveedores (idProveedor) on delete cascade,
foreign key (idUsuario) references Usuarios (idUsuario) on delete cascade,
foreign key (numReporte) references Reportes (numReporte) on delete cascade);


create table Reportes(
numReporte int auto_increment,
montoTotalVentas numeric (6,2),
montoTotalCompras numeric (6,2),
utilidad numeric (6,2),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (numReporte));

create table Productos(
idProducto int auto_increment,
nombreProducto varchar(50),
precioCompra numeric(6,2),
precioVenta numeric(6,2),
descripcionProducto varchar(100),
stock numeric,
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idCategoria int,
idCompra int,
primary key (idProducto, idCategoria, idCompra),
foreign key (idCategoria) references Categoria (idCategoria) on delete cascade,
foreign key (idCompra) references Compras (idCompra) on delete cascade);


create table MetodoPago(
idMetodoPago int auto_increment,
tipoPago varchar(100),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (idMetodoPago));


create table Ventas(
idVenta int auto_increment,
montoSinIVA numeric (6,2),
IVA numeric (6,2),
montoConIVA numeric(6,2),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idVendedor int,
numReporte int,
idMetodoPago int,
primary key (idVenta, idVendedor, numReporte, idMetodoPago),
foreign key (idVendedor) references Vendedores (idVendedor) on delete cascade,
foreign key (numReporte) references Reportes (numReporte) on delete cascade,
foreign key (idMetodoPago) references MetodoPago (idMetodoPago) on delete cascade);

create table Envios(
idEnvio int auto_increment,
tipoEnvio varchar(20),
descripcion varchar(200),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (idEnvio));*/

/*create table DetalleVenta(
idDetalleVenta int auto_increment,
direccion varchar(50),
ciudad varchar(20),
observaciones varchar(100),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idVenta int,
idEnvio int,
primary key (idDetalleVenta, idVenta, idEnvio),
foreign key (idVenta) references Ventas (idVenta) on delete cascade,
foreign key (idEnvio) references Envios (idEnvio) on delete cascade);

create table Clientes
(idCliente int auto_increment,
nombreCliente varchar(50),
direccionCliente varchar(50),
ciudadCliente varchar(20),
telefonoCliente varchar(10),
emailCliente varchar(30),
passwordCliente BLOB,
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (idCliente));*/


create table Devoluciones(
idDevolucion int auto_increment,
fechaDevolucion datetime default now(),
montoSinIVA numeric(6,2),
IVA numeric(6,2),
montoConIVA numeric(6,2),
tipoDevolucion varchar(25),
motivoDevolucion varchar(100),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idCliente int,
primary key (idDevolucion, idCliente),
foreign key (idCliente) references Clientes (idCliente) on delete cascade);


/*create table BitacoraAccesos(
idAcceso int auto_increment,
accion varchar(10),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idUsuario int, 
primary key (idAcceso),
foreign key (idUsuario) references Usuarios (idUsuario) on delete cascade);*/


--Tablas de las relaciones
create table proveedores_productos(
idProveedor int,
idProducto int,
primary key (idProveedor, idProducto),
foreign key (idProveedor) references Proveedores (idProveedor) on delete cascade,
foreign key (idProducto) references Productos (idProducto) on delete cascade);

create table productos_ventas(
idProducto int,
idVenta int,
cantidad varchar(15),
primary key (idProducto, idVenta),
foreign key (idProducto) references Productos (idProducto) on delete cascade,
foreign key (idVenta) references Ventas (idVenta) on delete cascade);

create table ventas_clientes(
idVenta int,
idCliente int,
primary key (idVenta, idCliente),
foreign key (idVenta) references Ventas (idVenta) on delete cascade,
foreign key (idCliente) references Clientes (idCliente) on delete cascade);

create table productos_devoluciones(
idProducto int,
idDevolucion int,
primary key (idProducto, idDevolucion),
foreign key (idProducto) references Productos (idProducto) on delete cascade,
foreign key (idDevolucion) references Devoluciones (idDevolucion) on delete cascade);

create table ventas_metodoPago(
idVenta int,
idMetodoPago int,
primary key (idVenta, idMetodoPago),
foreign key (idVenta) references Ventas (idVenta) on delete cascade,
foreign key (idMetodoPago) references MetodoPago (idMetodoPago) on delete cascade);



--Producto más vendido
SELECT productos_ventas.idProducto, SUM(productos_ventas.cantidad) AS TotalVentas FROM productos_ventas, Productos GROUP BY productos_ventas.idProducto, Productos.nombreProducto ORDER BY SUM(productos_ventas.cantidad) DESC LIMIT 0 , 5;
SELECT  pv.idProducto, p.nombreProducto AS Producto, SUM(pv.cantidad) AS TotalVentas FROM productos_ventas pv  INNER JOIN Productos p ON pv.idProducto = p.idProducto WHERE p.estado = 1  GROUP BY pv.idProducto, p.nombreProducto ORDER BY SUM(pv.cantidad)  DESC  LIMIT 0 , 5 ;

--Vendedor con mas ventas 
SELECT  VEND.idVendedor, VEND.nombreVendedor AS Vendedor, SUM(V.montoConIVA) AS ImporteVenta FROM Vendedores VEND  INNER JOIN Ventas V ON VEND.idVendedor = V.idVendedor WHERE V.estado = 1  GROUP BY VEND.idVendedor, VEND.nombreVendedor ORDER BY SUM(V.montoConIVA)  DESC  LIMIT 0 , 5 ;
--Productos con stock minimo

SELECT * FROM Productos WHERE stock <= 5;

--Restar el stock segun la cantidad de productos vendidos
UPDATE Productos INNER JOIN ( SELECT idProducto, SUM(cantidad) cantidad FROM productos_ventas GROUP BY idProducto ) productos_ventas ON Productos.idProducto = productos_ventas.idProducto  SET Productos.stock = Productos.stock - productos_ventas.cantidad WHERE Productos.estado = 1;


--(funciono) SELECT * FROM Ventas WHERE MONTH(fechaRegistro) < MONTH(CURDATE());







SELECT 

SELECT  p.idProducto, p.nombreProducto AS Producto, SUM(pv.cantidad) AS TotalVentas FROM productos_ventas pv  INNER JOIN Productos p ON pv.idProducto = p.idProducto WHERE p.estado = 1  GROUP BY pv.idProducto, p.nombreProducto ORDER BY SUM(pv.cantidad)  DESC  LIMIT 0 , 5 ;


UPDATE Productos SET stock = stock - @cantidad  WHERE idProducto = @idProducto




UPDATE tabla1 T1 LEFT JOIN ( SELECT descripcion, SUM(parcial) total  FROM tabla2 GROUP BY descripcion ) T2 ON T1.descripcion = T2.descripcion SET T1.total = T2.total;