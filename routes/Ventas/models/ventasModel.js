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
				var query = 'SELECT v.idVenta, v.montoSinIVA, v.IVA, v.montoConIVA,pv.idProducto,pv.cantidadProducto,v.fechaRegistro, v.fechaActualizacion, v.estado,v.idVendedor,c.idCliente,mp.idMetodoPago FROM Ventas v INNER JOIN productos_ventas pv  ON  v.idVenta=pv.idVenta INNER JOIN ventas_clientes c ON v.idVenta=c.idVenta INNER JOIN ventas_metodoPago mp ON v.idVenta=mp.idVenta WHERE v.estado = 1';

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


		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				let montoSinIVA = req.body.montoSinIVA;
				let IVA = req.body.IVA;
				let montoConIVA = req.body.montoConIVA;
				let idUsuario = req.body.idUsuario;
				let idProducto = req.body.idProducto;
				let cantidadProducto = req.body.cantidadProducto;
				let idCliente = req.body.idCliente;
				let idMetodoPago = req.body.idMetodoPago;
				let query = `CALL realizarInsercion( ${montoSinIVA},${IVA},${montoConIVA},${idUsuario},${idProducto},${cantidadProducto},${idCliente},${idMetodoPago})`;


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
		});
	});
}

//modificar una venta existente
exports.modificarVenta = function (req) {
	return new Promise((resolve, reject) => {

		let idVenta = req.params.idVenta;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				let montoSinIVA = req.body.montoSinIVA;
				let IVA = req.body.IVA;
				let montoConIVA = req.body.montoConIVA;
				let idVendedor = req.body.idVendedor;
				let idProducto = req.body.idProducto;
				let cantidadProducto = req.body.cantidadProducto;
				let idCliente = req.body.idCliente;
				let idMetodoPago = req.body.idMetodoPago;
				let query =  `CALL realizarModificacion(${montoSinIVA},${IVA},${montoConIVA},${idVendedor},${idProducto},${cantidadProducto},${idCliente},${idMetodoPago})`;

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
							respuesta: 'Venta actualizada correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar una venta existente
 exports.eliminarVenta = function (req) {
 	return new Promise((resolve, reject) => {

 		let idVenta = req.params.idVenta;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Ventas set ? where idVenta = ${idVenta}`;

 				let request_body = {
 					estado: 0
 				};
 				database.query(query, request_body, function (error, success) {
 					if (error) {
 						reject({
 							estatus: -1,
 							respuesta: error
 						});
 					}
 					else {
 						resolve({
 							estatus: 1,
 							respuesta: 'Venta eliminada correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
