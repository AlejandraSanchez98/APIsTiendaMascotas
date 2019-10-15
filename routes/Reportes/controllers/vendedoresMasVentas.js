var express = require('express');
var router = express.Router();
//requerir el modelo
var  vendedoresMasVentasModel= require('../models/vendedoresMasVentasModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET");

	next();
});

//obtener vendedores con mas ventas
router.get('/vendedoresMasVentas', function (req, res, next) {
	try {
		//web service
		vendedoresMasVentasModel.vendedoresMasVentas(req).then(
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
