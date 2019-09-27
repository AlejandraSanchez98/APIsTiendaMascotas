//obtener todas las devoluciones
exports.listarDevoluciones = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Devoluciones where estado = 1';

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

//Agregar una nueva devolución
exports.agregarDevolucion = function (req) {
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

				let query = 'insert into Devoluciones set ?';

				let request_body = {
          montoSinIVA: body.montoSinIVA,
          IVA: body.IVA,
          montoConIVA: body.montoConIVA,
          tipoDevolucion: body.tipoDevolucion,
          motivoDevolucion: body.motivoDevolucion,
          idCliente: body.idCliente
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
							respuesta: 'Devolución dada de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar devolución existente
exports.modificarDevolucion = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idDevolucion = req.params.idDevolucion;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Devoluciones set ? where idDevolucion = ${idDevolucion}`;

				let request_body = {
          montoSinIVA: body.montoSinIVA,
          IVA: body.IVA,
          montoConIVA: body.montoConIVA,
          tipoDevolucion: body.tipoDevolucion,
          motivoDevolucion: body.motivoDevolucion,
          idCliente: body.idCliente
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
							respuesta: 'Devolución actualizada correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar una devolución existente
 exports.eliminarDevolucion = function (req) {
 	return new Promise((resolve, reject) => {

 		let idDevolucion = req.params.idDevolucion;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Devoluciones set ? where idDevolucion = ${idDevolucion}`;

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
 							respuesta: 'Devolución eliminada correctamente'
 						});
 					}
 				});
 			}
 		});
 	});
 }
