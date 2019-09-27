var express = require('express');
var router = express.Router();
//requerir el modelo
var devolucionesModel = require('../models/devolucionesModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todas las devoluciones
router.get('/listarDevoluciones', function (req, res, next) {
	try {
		//web service
		devolucionesModel.listarDevoluciones(req).then(
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

//Agregar una nueva devolución
router.post('/agregarDevolucion', function (req, res, next) {
	try {
		//web service
		devolucionesModel.agregarDevolucion(req).then(
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

//modificar devolución existente
router.put('/modificarDevolucion/:idDevolucion', function (req, res, next) {
	try {
		devolucionesModel.modificarDevolucion(req).then(
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

//eliminar una devolución existente
router.delete('/eliminarDevolucion/:idDevolucion', function (req, res, next) {
	try {
		devolucionesModel.eliminarDevolucion(req).then(
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
