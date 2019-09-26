var express = require('express');
var router = express.Router();
//requerir el modelo
var detalleVentaModel = require('../models/detalleVentaModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla detalle de venta
router.get('/listarDetallesVentas', function (req, res, next) {
	try {
		//web service
		detalleVentaModel.listarDetallesVentas(req).then(
			(success) => {
				res.json(success);
			},
			(error) => {
				res.json(error);
			}
		);
	}
	catch (error) {
		return next(error);
	}
});

//Agregar un nuevo detalle de venta
router.post('/agregarDetalleVenta', function (req, res, next) {
	try {
		//web service
		detalleVentaModel.agregarDetalleVenta(req).then(
			(success) => {
				res.json(success);
			},
			(error) => {
				res.json(error);
			}
		);
	}
	catch (error) {
		return next(error);
	}
});

//modificar un detalle de venta existente
router.put('/modificarDetalleVenta/:idDetalleVenta', function (req, res, next) {
	try {
		detalleVentaModel.modificarDetalleVenta(req).then(
			(success) => {
				res.json(success);
			},
			(error) => {
				res.json(error);
			}
		);
	}
	catch (error) {
		return next(error);
	}
});

///eliminar un detalle de venta existente
router.delete('/eliminarDetalleVenta/:idDetalleVenta', function (req, res, next) {
	try {
		detalleVentaModel.eliminarDetalleVenta(req).then(
			(success) => {
				res.json(success);
			},
			(error) => {
				res.json(error);
			}
		);
	}
	catch (error) {
		return next(error);
	}
});


module.exports = router;
