//obtener todos los registos de la tabla envios
exports.listarEnvios = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Envios where estado = 1';

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

//Agregar un nuevo envios
exports.agregarEnvio = function (req) {
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

				let query = 'insert into Envios set ?';

				let request_body = {
          tipoEnvio:body.tipoEnvio,
          descripcion:body.descripcion,
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
							respuesta: 'Envio dado de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar un envio existente
exports.modificarEnvio = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idEnvio = req.params.idEnvio;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Envios set ? where idEnvio = ${idEnvio}`;

				let request_body = {
          tipoEnvio:body.tipoEnvio,
          descripcion:body.descripcion
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
							respuesta: 'Envio actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un envio existente
 exports.eliminarEnvio = function (req) {
 	return new Promise((resolve, reject) => {

 		let idEnvio = req.params.idEnvio;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Envios set ? where idEnvio = ${idEnvio}`;

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
 							respuesta: 'Envio eliminado correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
