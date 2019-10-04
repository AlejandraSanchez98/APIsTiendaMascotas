//Actualizar el stock de la tabla Productos restando el stock segun la cantidad de productos vendidos
exports.restarStock = function (req) {
	return new Promise((resolve, reject) => {

		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {

				let query = 'UPDATE Productos INNER JOIN ( SELECT idProducto, SUM(cantidadProducto) cantidadProducto FROM productos_ventas GROUP BY idProducto ) productos_ventas ON Productos.idProducto = productos_ventas.idProducto  SET Productos.stock = Productos.stock - productos_ventas.cantidadProducto WHERE Productos.estado = 1;';

				database.query(query,function (error, success) {
					if (error) {
						reject({
							estatus: -1,
							respuesta: error
						});
					}
					else {
						resolve({
							estatus: 1,
							respuesta: 'Stock Actualizado'

						});
					}
				});
			}
		});
	});
}
