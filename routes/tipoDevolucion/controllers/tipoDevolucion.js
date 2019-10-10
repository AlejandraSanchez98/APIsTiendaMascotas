var express = require('express');
var router = express.Router();
//requerir el modelo
var tipoDevolucionModel = require('../models/tipoDevolucionModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE")

	next();
});

//obtener los tipos de devoluciones
router.get('/listarTiposDevoluciones', function (req, res, next) {
	try {
		//web service
		tipoDevolucionModel.listarTiposDevoluciones(req).then(
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

//Agregar un nuevo tipo de devolución
router.post('/agregarTipoDevolucion', function (req, res, next) {
	try {
		//web service
		tipoDevolucionModel.agregarTipoDevolucion(req).then(
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

//modificar tipo de devolución existente
router.put('/modificarTipoDevolucion/:idTipoDevolucion', function (req, res, next) {
	try {
		tipoDevolucionModel.modificarTipoDevolucion(req).then(
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

//eliminar un tipo de devolución existente
router.delete('/eliminarTipoDevolucion/:idTipoDevolucion', function (req, res, next) {
	try {
		tipoDevolucionModel.eliminarTipoDevolucion(req).then(
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
