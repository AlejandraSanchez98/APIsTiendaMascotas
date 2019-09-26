var express = require('express');
var router = express.Router();
//requerir el modelo
var enviosModel = require('../models/enviosModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla envios
router.get('/listarEnvios', function (req, res, next) {
	try {
		//web service
		enviosModel.listarEnvios(req).then(
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

//Agregar un nuevo envio
router.post('/agregarEnvio', function (req, res, next) {
	try {
		//web service
		enviosModel.agregarEnvio(req).then(
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

//modificar un envio existente
router.put('/modificarEnvio/:idEnvio', function (req, res, next) {
	try {
		enviosModel.modificarEnvio(req).then(
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

//eliminar un envio existente
router.delete('/eliminarEnvio/:idEnvio', function (req, res, next) {
	try {
		enviosModel.eliminarEnvio(req).then(
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
