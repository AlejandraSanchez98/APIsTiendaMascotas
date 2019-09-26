var express = require('express');
var router = express.Router();
//requerir el modelo
var reportesModel = require('../models/reportesModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla Reportes
router.get('/listarReportes', function (req, res, next) {
	try {
		//web service
		reportesModel.listarReportes(req).then(
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

//Agregar un nuevo reporte
router.post('/agregarReporte', function (req, res, next) {
	try {
		//web service
		reportesModel.agregarReporte(req).then(
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

//modificar un reporte existente
router.put('/modificarReporte/:numReporte', function (req, res, next) {
	try {
		reportesModel.modificarReporte(req).then(
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

//eliminar un reporte existente
router.delete('/eliminarReporte/:numReporte', function (req, res, next) {
	try {
		reportesModel.eliminarReporte(req).then(
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
