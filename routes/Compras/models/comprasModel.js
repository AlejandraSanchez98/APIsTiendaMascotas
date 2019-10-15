//obtener todos los registos de la tabla compras
exports.listarCompras = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'SELECT c.idCompra,c.montoSinIVA,c.IVA,c.montoConIVA,p.nombreProveedor, u.nombreUsuario, pro.nombreProducto, pc.cantidadProducto FROM Compras c INNER JOIN Proveedores p  ON c.idProveedor=p.idProveedor INNER  JOIN Usuarios u  ON c.idUsuario=u.idUsuario INNER JOIN productos_compras pc ON c.idCompra= pc.idCompra INNER JOIN  Productos  pro ON pc.idProducto=pro.idProducto WHERE c.estado=1';

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

//Agregar una nueva compra
exports.agregarCompra = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				let montoSinIVA = body.montoSinIVA;
				let IVA = body.IVA;
				let montoConIVA = body.montoConIVA;
				let idProveedor = body.idProveedor;
				let idUsuario = body.idUsuario;
				let idProducto = body.idProducto;
				let idCompra = body.idCompra;
				let cantidadProducto = body.cantidadProducto;

				let query = `CALL insertarCompra('${montoSinIVA}', '${IVA}','${montoConIVA}', '${idProveedor}', '${idUsuario}', '${idProducto}', '${idCompra}', '${cantidadProducto}')`;


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
							respuesta: 'Compra dada de alta correctamente'

						});
					}
				});
			}
		});
	});
}
