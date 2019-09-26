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
				var query = 'select * from Compras where estado = 1';

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

				let query = 'insert into Compras set ?';

				let request_body = {
          montoSinIVA: body.montoSinIVA,
          IVA: body.IVA,
          montoConIVA: body.montoConIVA,
          idProveedor: body.idProveedor,
          idUsuario:body.idUsuario,
					numReporte:body.numReporte
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
							respuesta: 'Compra dada de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar una compra existente
exports.modificarCompra = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idCompra = req.params.idCompra;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Compras set ? where idCompra = ${idCompra}`;

				let request_body = {
          montoSinIVA: body.montoSinIVA,
          IVA: body.IVA,
          montoConIVA: body.montoConIVA,
          idProveedor: body.idProveedor,
          idUsuario:body.idUsuario,
					numReporte:body.numReporte
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
							respuesta: 'Compra actualizada correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar una compra existente
 exports.eliminarCompra = function (req) {
 	return new Promise((resolve, reject) => {

 		let idCompra = req.params.idCompra;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Compras set ? where idCompra = ${idCompra}`;

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
 							respuesta: 'Compra eliminada correctamente'
 						});
 					}
 				});
 			}
 		});
 	});
 }
