var express = require('express');
var router = express.Router();
//requerir el modelo
var  restarStockModel= require('../models/restarStockModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//Actualizar el stock de la tabla Productos restando el stock segun la cantidad de productos vendidos
router.put('/restarStock', function (req, res, next) {
	try {
		//web service
		restarStockModel.restarStock(req).then(
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
