var express = require('express');
var router = express.Router();
//requerir el modelo
var vendedoresModel = require('../models/vendedoresModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla vendedores
router.get('/listarVendedores', function (req, res, next) {
	try {
		//web service
		vendedoresModel.listarVendedores(req).then(
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

//Agregar un nuevo vendedor
router.post('/agregarVendedor', function (req, res, next) {
	try {
		//web service
		vendedoresModel.agregarVendedor(req).then(
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

//modificar un vendedor existente
router.put('/modificarVendedor/:idVendedor', function (req, res, next) {
	try {
		vendedoresModel.modificarVendedor(req).then(
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

//eliminar un vendedor existente
router.delete('/eliminarVendedor/:idVendedor', function (req, res, next) {
	try {
		vendedoresModel.eliminarVendedor(req).then(
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
