//obtener todos los registos de la tabla ventas
exports.listarVentas = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'SELECT v.idVenta, v.montoSinIVA, v.IVA, v.montoConIVA, v.fechaRegistro, pro.nombreProducto,vp.cantidadProducto,u.nombreUsuario,c.nombreCliente,mp.tipoPago FROM Ventas v  INNER JOIN ventas_productos vp ON v.idVenta= vp.idVenta INNER JOIN  Productos  pro ON vp.idProducto=pro.idProducto INNER JOIN Usuarios u  ON v.idUsuario=u.idUsuario INNER JOIN Clientes c ON v.idCliente=c.idCliente INNER JOIN ventas_metodoPago vmp ON v.idVenta=vmp.idVenta INNER JOIN metodoPago mp ON vmp.idMetodoPago=mp.idMetodoPago WHERE v.estado=1';

				database.query(query, function (error, success) {
					if (error) {
						reject({
							estatus: -1,
							respuesta: error
						});
					}
					else {
						if (success.length == 0) {
							resolve({
								estatus: 0,
								respuesta: success
							});
						}
						else if (success.length > 0) {
							resolve({
								estatus: 1,
								respuesta: success
							});
						}
					}
				});
			}
		});
	});
}

//Agregar una nueva venta
exports.agregarVenta = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
				return;
			}
			console.log("base de datos", database);
			let pago = body.pago;
			let idUsuario = body.idUsuario;
      let idCliente = body.idCliente;
			let productos = body.productos;
      let metodoPago = body.metodoPago;
      let cantidadTotalProductos = 0;
			let montoSinIVA = 0;
			let IVA = 0;
			let montoConIVA=0;
			let cambio=0;
			let arregloResultados= [];

			console.log("Antes de entrar",productos);
			let promesaOperaciones = function(){
				return new Promise((resolve,reject) => {
					for (var i = 0; i < productos.length; i++) {
						cantidadTotalProductos = cantidadTotalProductos + productos[i].cantidadProductos;
					}

					console.log("Entro primer for",productos);
					for (let i = 0; i < productos.length; i++) {
						let query = `SELECT precioUnitario FROM Productos WHERE idProducto = ${productos[i].idProducto}`;
						database.query(query, function (error, success) {
							if (error) {
								reject({
									estatus: -1,
									respuesta:error
								});
								return;
							}
							montoSinIVA = montoSinIVA + (success[0].precioUnitario * productos[i].cantidadProductos);

							if (i==productos.length - 1) {
								IVA = montoSinIVA * .16;
								montoConIVA = montoSinIVA + IVA;
								cambio = pago - montoConIVA;
								resolve(
									arregloResultados=[cantidadTotalProductos, montoSinIVA, IVA, montoConIVA, cambio]
								);
							}
						});
					}
				});
			}


			promesaOperaciones().then(
				(success) => {
					console.log("entro1");

					let query = `INSERT INTO Ventas(montoSinIVA,IVA,montoConIVA,cantidadTotalProductos,pago,cambio,idUsuario,idCliente) VALUES (${montoSinIVA},${IVA},${montoConIVA},${cantidadTotalProductos},${pago},${cambio}, ${idUsuario},${idCliente})`;
					database.query(query, function (error, success) {
						if (error) {
							console.log("error");
							reject({
								estatus: -1,
								respuesta: error
							});
						}
						else {
							resolve({
								estatus: 1,
								respuesta: 'Venta dada de alta correctamente'
							});
						}
					});


					for (var i = 0; i < productos.length; i++) {
						console.log("entro2");
						let queryVP = `INSERT INTO ventas_productos(idVenta,idProducto,cantidadProducto) VALUES (LAST_INSERT_ID() ,${productos[i].idProducto},${productos[i].cantidadProductos})`;
						database.query(queryVP, function (error, success) {
							if (error) {
								reject({
									estatus: -1,
									respuesta: error
								});
							}
							else {
								resolve({
									estatus: 1,
									respuesta: 'Venta  dada de alta correctamente'
								});
							}
						});

						let queryU = `UPDATE Productos SET stock = stock - ${productos[i].cantidadProductos} WHERE idProducto= ${productos[i].idProducto}`;
						database.query(queryU, function (error, success) {
							if (error) {
								reject({
									estatus: -1,
									respuesta: error
								});
							}
							else {
								resolve({
									estatus: 1,
									respuesta: 'Venta  dada de alta correctamente'
								});
							}
						});
					}

					for (var i = 0; i < metodoPago.length; i++) {
						let query = `INSERT INTO ventas_metodoPago(idVenta,idMetodoPago) VALUES (LAST_INSERT_ID(),${metodoPago[i].idMetodoPago})`;
						database.query(query, function (error, success) {
							if (error) {
								reject({
									estatus: -1,
									respuesta: error
								});
							}
							else {
								resolve({
									estatus: 1,
									respuesta: 'Venta dada de alta correctamente'
								});
							}
						});
					}
				},
				(error) => {
					console.log("Error" , error);
				});//fin promesa
			});
		});
	}
