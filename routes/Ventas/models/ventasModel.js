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
				var query = 'SELECT v.idVenta, v.montoSinIVA, v.IVA, v.montoConIVA,pro.nombreProducto,pv.cantidadProducto,u.nombreUsuario,c.nombreCliente,mp.tipoPago FROM Ventas v  INNER JOIN productos_ventas pv ON v.idVenta= pv.idVenta INNER JOIN  Productos  pro ON pv.idProducto=pro.idProducto INNER  JOIN Usuarios u  ON v.idUsuario=u.idUsuario  INNER JOIN ventas_clientes vc ON  v.idVenta=vc.idVenta INNER JOIN Clientes c ON vc.idCliente=c.idCliente INNER JOIN ventas_metodoPago vmp ON v.idVenta=vmp.idVenta INNER JOIN metodoPago mp ON vmp.idMetodoPago=mp.idMetodoPago WHERE v.estado=1';

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
				let idVenta = req.body.idVenta;
				let cantidadProducto = req.body.cantidadProducto;
				let idCliente = req.body.idCliente;
				let idMetodoPago = req.body.idMetodoPago;
				let query = `CALL insertarVenta( '${montoSinIVA}','${IVA}','${montoConIVA}','${idUsuario}','${idProducto}','${idVenta}', '${cantidadProducto}','${idCliente}','${idMetodoPago}')`;


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
