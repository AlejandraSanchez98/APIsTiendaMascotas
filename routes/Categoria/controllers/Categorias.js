var express = require('express');
var router = express.Router();
//requerir el modelo
var categoriasModel = require('../models/categoriasModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
		res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE")
	next();
});

//obtener todos los registos de la tabla Categoria
router.get('/listarCategorias', function (req, res, next) {
	try {
		//web service
		categoriasModel.listarCategorias(req).then(
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

//Agregar una nueva categoria
router.post('/agregarCategoria', function (req, res, next) {
	try {
		//web service
		categoriasModel.agregarCategoria(req).then(
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

//modificar una categoria existente
router.put('/modificarCategoria/:idCategoria', function (req, res, next) {
	try {
		categoriasModel.modificarCategoria(req).then(
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

//eliminar un proveedor existente
router.delete('/eliminarCategoria/:idCategoria', function (req, res, next) {
	try {
		categoriasModel.eliminarCategoria(req).then(
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
