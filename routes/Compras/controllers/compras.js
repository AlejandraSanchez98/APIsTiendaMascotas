var express = require('express');
var router = express.Router();
//requerir el modelo
var comprasModel = require('../models/comprasModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla compras
router.get('/listarCompras', function (req, res, next) {
	try {
		//web service
		comprasModel.listarCompras(req).then(
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

//Agregar un nuevo compra
router.post('/agregarCompra', function (req, res, next) {
	try {
		//web service
		comprasModel.agregarCompra(req).then(
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

//modificar una compra existente
router.put('/modificarCompra/:idCompra', function (req, res, next) {
	try {
		comprasModel.modificarCompra(req).then(
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

//eliminar una compra existente
router.delete('/eliminarCompra/:idCompra', function (req, res, next) {
	try {
		comprasModel.eliminarCompra(req).then(
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
