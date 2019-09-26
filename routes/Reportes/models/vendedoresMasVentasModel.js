//obtener Vendedores con mas ventas
exports.vendedoresMasVentas = function (req) {
	return new Promise((resolve, reject) => {
		req.getConnection(function (error, database) {
			if (error) {
				reject({
					estatus: -1,
					respuesta: error
				});
			}
			else {
				var query = 'SELECT  VEND.idVendedor, VEND.nombreVendedor AS Vendedor, SUM(V.montoConIVA) AS ImporteVenta FROM Vendedores VEND  INNER JOIN Ventas V ON VEND.idVendedor = V.idVendedor WHERE V.estado = 1  GROUP BY VEND.idVendedor, VEND.nombreVendedor ORDER BY SUM(V.montoConIVA)  DESC  LIMIT 0 , 5';

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
