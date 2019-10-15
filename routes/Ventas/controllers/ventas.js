var express = require('express');
var router = express.Router();
//requerir el modelo
var ventasModel = require('../models/ventasModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla ventas
router.get('/listarVentas', function (req, res, next) {
	try {
		//web service
		ventasModel.listarVentas(req).then(
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

//Agregar una nueva venta
router.post('/agregarVenta', function (req, res, next) {
	try {
		//web service
		ventasModel.agregarVenta(req).then(
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
