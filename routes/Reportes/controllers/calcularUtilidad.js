var express = require('express');
var router = express.Router();
//requerir el modelo
var  calcularUtilidadModel= require('../models/calcularUtilidadModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener utilidad
router.get('/calcularUtilidad', function (req, res, next) {
	try {
		//web service
		calcularUtilidadModel.calcularUtilidad(req).then(
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
