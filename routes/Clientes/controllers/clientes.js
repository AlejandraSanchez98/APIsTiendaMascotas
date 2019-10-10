var express = require('express');
var router = express.Router();
//requerir el modelo
var clientesModel = require('../models/clientesModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE")
	next();
});

//obtener todos los registos de la tabla clientes
router.get('/listarClientes', function (req, res, next) {
	try {
		//web service
		clientesModel.listarClientes(req).then(
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

//Agregar un nuevo cliente
router.post('/agregarCliente', function (req, res, next) {
	try {
		//web service
		clientesModel.agregarCliente(req).then(
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

//modificar un cliente existente
router.put('/modificarCliente/:idCliente', function (req, res, next) {
	try {
		clientesModel.modificarCliente(req).then(
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

//eliminar un cliente existente
router.delete('/eliminarCliente/:idCliente', function (req, res, next) {
	try {
		clientesModel.eliminarCliente(req).then(
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
