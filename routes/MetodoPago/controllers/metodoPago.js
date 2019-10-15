var express = require('express');
var router = express.Router();
//requerir el modelo
var metodoPagoModel = require('../models/metodoPagoModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

//obtener todos los registos de la tabla metodo de pago
router.get('/listarMetodosPago', function (req, res, next) {
	try {
		//web service
		metodoPagoModel.listarMetodosPago(req).then(
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

//Agregar un nuevo metodo de pago
router.post('/agregarMetodoPago', function (req, res, next) {
	try {
		//web service
		metodoPagoModel.agregarMetodoPago(req).then(
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

//modificar un metodo de pago existente
router.put('/modificarMetodoPago/:idMetodoPago', function (req, res, next) {
	try {
		metodoPagoModel.modificarMetodoPago(req).then(
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

//eliminar un  metodo de pago existente
router.delete('/eliminarMetodoPago/:idMetodoPago', function (req, res, next) {
	try {
		metodoPagoModel.eliminarMetodoPago(req).then(
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
