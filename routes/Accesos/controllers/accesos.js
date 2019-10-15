var express = require('express');
var router = express.Router();
//requerir el modelo
var accesosModel = require('../models/accesosModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET, POST");
	next();
});

//obtener todos los registos de la tabla bitacora de accesos
router.get('/listarAccesos', function (req, res, next) {
	try {
		//web service
		accesosModel.listarAccesos(req).then(
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

//Agregar un nuevo acceso
router.post('/agregarAcceso', function (req, res, next) {
	try {
		//web service
		accesosModel.agregarAcceso(req).then(
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
