--Crear base de datos
create database  tiendaMascotas;
--Usar la base de datos
use tiendaMascotas;
--Creación de tablas

create table Categoria(
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
primary key (idCompra, idProveedor, idUsuario),
foreign key (idProveedor) references Proveedores (idProveedor) on delete cascade,
foreign key (idUsuario) references Usuarios (idUsuario) on delete cascade);

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
primary key (idVenta, idVendedor),
foreign key (idVendedor) references Vendedores (idVendedor) on delete cascade);

create table Envios(
idEnvio int auto_increment,
tipoEnvio varchar(20),
descripcion varchar(200),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
primary key (idEnvio));

create table DetalleVenta(
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
primary key (idCliente));


create table Devoluciones(
idDevolucion int auto_increment,
fechaDevolucion datetime default now(),
montoSinIVA numeric(6,2),
IVA numeric(6,2),
montoConIVA numeric(6,2),
tipoDevolucion varchar(250),
motivoDevolucion varchar(100),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idCliente int,
primary key (idDevolucion, idCliente),
foreign key (idCliente) references Clientes (idCliente) on delete cascade);


create table BitacoraAccesos(
idAcceso int auto_increment,
accion varchar(10),
fechaRegistro datetime default now(),
fechaActualizacion datetime default now(),
estado tinyint(2) default 1,
idUsuario int, 
primary key (idAcceso),
foreign key (idUsuario) references Usuarios (idUsuario) on delete cascade);


--Tablas de las relaciones
create table proveedores_productos(
idProveedor int,
idProducto int,
primary key (idProveedor, idProducto),
foreign key (idProveedor) references Proveedores (idProveedor) on delete cascade,
foreign key (idProducto) references Productos (idProducto) on delete cascade);

create table productos_ventas(
idProducto int,
idVenta int  auto_increment,
cantidadProducto varchar(15),
primary key (idProducto, idVenta),
foreign key (idProducto) references Productos (idProducto) on delete cascade,
foreign key (idVenta) references Ventas (idVenta) on delete cascade);

create table ventas_clientes(
idVenta int auto_increment,
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
idVenta int auto_increment,
idMetodoPago int,
primary key (idVenta, idMetodoPago),
foreign key (idVenta) references Ventas (idVenta) on delete cascade,
foreign key (idMetodoPago) references MetodoPago (idMetodoPago) on delete cascade);




