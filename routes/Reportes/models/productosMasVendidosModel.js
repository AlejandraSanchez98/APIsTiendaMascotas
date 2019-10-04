//obtener productos mas vendidos
exports.productosMasVendidos = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'SELECT  pv.idProducto, p.nombreProducto AS Producto, SUM(pv.cantidadProducto) AS TotalVentas FROM productos_ventas pv  INNER JOIN Productos p ON pv.idProducto = p.idProducto WHERE p.estado = 1  GROUP BY pv.idProducto, p.nombreProducto ORDER BY SUM(pv.cantidadProducto)  DESC  LIMIT 0 , 5 ';

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
