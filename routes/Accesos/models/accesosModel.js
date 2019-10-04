//obtener todos los registos de la tabla bitacora de accesos
exports.listarAccesos = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from BitacoraAccesos where estado = 1';

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

//Agregar un nuevo acceso
exports.agregarAcceso = function (req) {
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

				let query = 'insert into BitacoraAccesos set ?';

				let request_body = {
          accion: body.accion,
          idUsuario: body.idUsuario
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
							respuesta: 'Acceso dado de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar un cliente existente
exports.modificarAcceso = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idAcceso = req.params.idAcceso;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update BitacoraAccesos set ? where idAcceso = '${idAcceso}'`;

				let request_body = {
          accion: body.accion,
          idUsuario: body.idUsuario
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
							respuesta: 'Acceso actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un acceso existente
 exports.eliminarAcceso = function (req) {
 	return new Promise((resolve, reject) => {

 		let idAcceso = req.params.idAcceso;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update BitacoraAccesos set ? where idAcceso = '${idAcceso}'`;

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
 							respuesta: 'Acceso eliminado correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
