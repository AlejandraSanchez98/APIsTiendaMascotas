//obtener todos los registos de la tabla productos
exports.listarProductos = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'select * from Productos where estado = 1';

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

//Agregar un nuevo producto
exports.agregarProducto = function (req) {
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

				let query = 'insert into Productos set ?';

				let request_body = {
          nombreProducto: body.nombreProducto,
          precioCompra: body.precioCompra,
          precioVenta: body.precioVenta,
          descripcionProducto: body.descripcionProducto,
          stock: body.stock,
          idCategoria:body.idCategoria,
          idCompra:body.idCompra
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
							respuesta: 'Producto dado de alta correctamente'

						});
					}
				});
			}
		});
	});
}

//modificar un producto existente
exports.modificarProducto = function (req) {
	return new Promise((resolve, reject) => {

		let body = req.body;
		let idProducto = req.params.idProducto;
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = `update Productos set ? where idProducto = ${idProducto}`;

				let request_body = {
          nombreProducto: body.nombreProducto,
          precioCompra: body.precioCompra,
          precioVenta: body.precioVenta,
          descripcionProducto: body.descripcionProducto,
          stock: body.stock,
          idCategoria:body.idCategoria,
          idCompra:body.idCompra
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
							respuesta: 'Producto actualizado correctamente'

						});
					}
				});
			}
		});
	});
}

 //eliminar un producto existente
 exports.eliminarProducto = function (req) {
 	return new Promise((resolve, reject) => {

 		let idProducto = req.params.idProducto;
 		req.getConnection(function (error, database) {
 			if (error) {
 				reject({
 					estatus: -1,
 					respuesta: error
 				});
 			}
 			else {

 				let query = `update Productos set ? where idProducto = ${idProducto}`;

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
 							respuesta: 'Producto eliminado correctamente'

 						});
 					}
 				});
 			}
 		});
 	});
 }
