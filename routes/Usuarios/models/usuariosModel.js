//obtener todos los registos de la tabla usuarios
exports.listarUsuarios = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Usuarios where estado = 1';

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

//Agregar un nuevo usuario
exports.agregarUsuario = function (req) {
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

				let query = 'insert into Usuarios set ?';

				let request_body = {
          nombreUsuario: body.nombreUsuario,
          correo: body.correo,
          passwordUsuario: body.passwordUsuario,
          tipoUsuario: body.tipoUsuario,
          idVendedor:body.idVendedor
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
							respuesta: 'Usuario dado de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar un usuario existente
exports.modificarUsuario = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idUsuario = req.params.idUsuario;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Usuarios set ? where idUsuario = ${idUsuario}`;

				let request_body = {
          nombreUsuario: body.nombreUsuario,
          correo: body.correo,
          passwordUsuario: body.passwordUsuario,
          tipoUsuario: body.tipoUsuario,
          idVendedor:body.idVendedor
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
							respuesta: 'Usuario actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un usuario existente
 exports.eliminarUsuario = function (req) {
 	return new Promise((resolve, reject) => {

 		let idUsuario = req.params.idUsuario;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Usuarios set ? where idUsuario = ${idUsuario}`;

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
 							respuesta: 'Usuario eliminado correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
