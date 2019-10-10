var express = require('express');
var router = express.Router();
//requerir el modelo
var devolucionesModel = require('../models/devolucionesModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET, POST")
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

module.exports = router;
