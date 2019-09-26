//obtener todos los registos de la tabla reportes
exports.listarReportes = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Reportes WHERE estado= 1';

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

//Agregar un nuevo Reporte
exports.agregarReporte = function (req) {
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

				let query = 'insert into Reportes set ?';

				let request_body = {
          montoTotalVentas:body.montoTotalVentas,
					montoTotalCompras:body.montoTotalCompras,
					utilidad:body.utilidad
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
							respuesta: 'Reporte generado exitosamente'

						});
					}
				});
			}
		});
	});
}

//modificar un reporte existente
exports.modificarReporte = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let numReporte = req.params.numReporte;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Reportes set ? where numReporte = ${numReporte}`;

				let request_body = {
					montoTotalVentas:body.montoTotalVentas,
					montoTotalCompras:body.montoTotalCompras,
					utilidad:body.utilidad
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
							respuesta: 'Reporte actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un reporte existente
 exports.eliminarReporte = function (req) {
 	return new Promise((resolve, reject) => {

 		let numReporte = req.params.numReporte;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Reportes set ? where numReporte = ${numReporte}`;

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
 							respuesta: 'Reporte eliminado correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
