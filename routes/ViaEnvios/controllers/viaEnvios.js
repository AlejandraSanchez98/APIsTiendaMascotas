var express = require('express');
var router = express.Router();
//requerir el modelo
var viaEnviosModel = require('../models/viaEnviosModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE")

	next();
});

//obtener todos los medios de  envio
router.get('/listarMediosEnvios', function (req, res, next) {
	try {
		//web service
		viaEnviosModel.listarMediosEnvios(req).then(
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

//Agregar un nuevo medio de envio
router.post('/agregarMedioEnvio', function (req, res, next) {
	try {
		//web service
		viaEnviosModel.agregarMedioEnvio(req).then(
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

//modificar un medio de envio existente
router.put('/modificarMedioEnvio/:idViaEnvio', function (req, res, next) {
	try {
		viaEnviosModel.modificarMedioEnvio(req).then(
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

//eliminar un medio de envio existente
router.delete('/eliminarMedioEnvio/:idViaEnvio', function (req, res, next) {
	try {
		viaEnviosModel.eliminarMedioEnvio(req).then(
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
