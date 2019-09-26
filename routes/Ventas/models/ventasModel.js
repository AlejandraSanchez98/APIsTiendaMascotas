//obtener todos los registos de la tabla ventas
exports.listarVentas = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Ventas where estado = 1';

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

//Agregar una nueva venta
exports.agregarVenta = function (req) {
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

				let query = 'insert into Ventas set ?';

				let request_body = {
          montoSinIVA: body.montoSinIVA,
          IVA: body.IVA,
          montoConIVA: body.montoConIVA,
          idVendedor: body.idVendedor,
          numReporte:body.numReporte,
          idMetodoPago:body.idMetodoPago
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
							respuesta: 'Venta dada de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar una venta existente
exports.modificarVenta = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idVenta = req.params.idVenta;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Ventas set ? where idVenta = ${idVenta}`;

				let request_body = {
          montoSinIVA: body.montoSinIVA,
          IVA: body.IVA,
          montoConIVA: body.montoConIVA,
          idVendedor: body.idVendedor,
          numReporte:body.numReporte,
          idMetodoPago:body.idMetodoPago
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
							respuesta: 'Venta actualizada correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar una venta existente
 exports.eliminarVenta = function (req) {
 	return new Promise((resolve, reject) => {

 		let idVenta = req.params.idVenta;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Ventas set ? where idVenta = ${idVenta}`;

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
 							respuesta: 'Venta eliminada correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
