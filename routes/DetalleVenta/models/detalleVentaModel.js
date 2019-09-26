//obtener todos los registos de la tabla detalle de venta
exports.listarDetallesVentas = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from DetalleVenta where estado = 1';

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

//Agregar un nuevo detalle de venta
exports.agregarDetalleVenta = function (req) {
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

				let query = 'insert into DetalleVenta set ?';

				let request_body = {
          direccion: body.direccion,
          ciudad: body.ciudad,
          observaciones: body.observaciones,
          idVenta: body.idVenta,
          idEnvio:body.idEnvio
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
							respuesta: 'Detalle de venta dado de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar un detalle de venta existente
exports.modificarDetalleVenta = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idDetalleVenta = req.params.idDetalleVenta;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update DetalleVenta set ? where idDetalleVenta = ${idDetalleVenta}`;

				let request_body = {
          direccion: body.direccion,
          ciudad: body.ciudad,
          observaciones: body.observaciones,
          idVenta: body.idVenta,
          idEnvio:body.idEnvio
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
							respuesta: 'Detalle de venta actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un detalle de venta existente
 exports.eliminarDetalleVenta = function (req) {
 	return new Promise((resolve, reject) => {

 		let idDetalleVenta = req.params.idDetalleVenta;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update DetalleVenta set ? where idDetalleVenta = ${idDetalleVenta}`;

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
 							respuesta: 'Detalle de venta  eliminado correctamente'
 						});
 					}
 				});
 			}
 		});
 	});
 }
