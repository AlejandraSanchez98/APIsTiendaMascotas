var express = require('express');
var router = express.Router();
//requerir el modelo
var productosModel = require('../models/productosModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla productos
router.get('/listarProductos', function (req, res, next) {
	try {
		//web service
		productosModel.listarProductos(req).then(
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

//Agregar un nuevo producto
router.post('/agregarProducto', function (req, res, next) {
	try {
		//web service
		productosModel.agregarProducto(req).then(
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

//modificar un producto existente
router.put('/modificarProducto/:idProducto', function (req, res, next) {
	try {
		productosModel.modificarProducto(req).then(
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

//eliminar un producto existente
router.delete('/eliminarProducto/:idProducto', function (req, res, next) {
	try {
		productosModel.eliminarProducto(req).then(
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
