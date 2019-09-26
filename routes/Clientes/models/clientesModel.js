//obtener todos los registos de la tabla clientes
exports.listarClientes = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Clientes where estado = 1';

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

//Agregar un nuevo cliente
exports.agregarCliente = function (req) {
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

				let query = 'insert into Clientes set ?';

				let request_body = {
          nombreCliente: body.nombreCliente,
          direccionCliente: body.direccionCliente,
          ciudadCliente: body.ciudadCliente,
          telefonoCliente: body.telefonoCliente,
          emailCliente: body.emailCliente,
          passwordCliente: body.passwordCliente
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
							respuesta: 'Cliente dado de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar un cliente existente
exports.modificarCliente = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idCliente = req.params.idCliente;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Clientes set ? where idCliente = ${idCliente}`;

				let request_body = {
          nombreCliente: body.nombreCliente,
          direccionCliente: body.direccionCliente,
          ciudadCliente: body.ciudadCliente,
          telefonoCliente: body.telefonoCliente,
          emailCliente: body.emailCliente,
          passwordCliente: body.passwordCliente
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
							respuesta: 'Cliente actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un cliente existente
 exports.eliminarCliente = function (req) {
 	return new Promise((resolve, reject) => {

 		let idCliente = req.params.idCliente;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Clientes set ? where idCliente = ${idCliente}`;

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
 							respuesta: 'Cliente eliminado correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
