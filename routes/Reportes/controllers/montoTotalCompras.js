var express = require('express');
var router = express.Router();
//requerir el modelo
var  montoTotalComprasModel= require('../models/montoTotalComprasModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener Monto total de las ventas realizadas
router.get('/calcularMontoTotalCompras', function (req, res, next) {
	try {
		//web service
		montoTotalComprasModel.calcularMontoTotalCompras(req).then(
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
