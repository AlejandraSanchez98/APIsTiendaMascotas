exports.listarVendedores = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Vendedores where estado = 1';

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

//Agregar un nuevo vendedor
exports.agregarVendedor = function (req) {
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

				let query = 'insert into Vendedores set ?';

				let request_body = {
          nombreVendedor: body.nombreVendedor,
          emailVendedor: body.emailVendedor,
          telefonoVendedor: body.telefonoVendedor,
          direccionVendedor: body.direccionVendedor,
          ciudadVendedor: body.ciudadVendedor
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
							respuesta: 'Vendedor dado de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar un vendedor existente
exports.modificarVendedor = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idVendedor = req.params.idVendedor;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Vendedores set ? where idVendedor = ${idVendedor}`;

				let request_body = {
          nombreVendedor: body.nombreVendedor,
          emailVendedor: body.emailVendedor,
          telefonoVendedor: body.telefonoVendedor,
          direccionVendedor: body.direccionVendedor,
					ciudadVendedor: body.ciudadVendedor
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
							respuesta: 'Vendedor actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un vendedor existente
 exports.eliminarVendedor = function (req) {
 	return new Promise((resolve, reject) => {

 		let idVendedor = req.params.idVendedor;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Vendedores set ? where idVendedor = ${idVendedor}`;

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
 							respuesta: 'Vendedor eliminado correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
