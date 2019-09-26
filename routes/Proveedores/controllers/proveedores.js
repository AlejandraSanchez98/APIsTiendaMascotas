var express = require('express');
var router = express.Router();
//requerir el modelo
var proveedoresModel = require('../models/proveedoresModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});

//obtener todos los registos de la tabla proveedores
router.get('/listarProveedores', function (req, res, next) {
	try {
		//web service
		proveedoresModel.listarProveedores(req).then(
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

//Agregar un nuevo proveedor
router.post('/agregarProveedor', function (req, res, next) {
	try {
		//web service
		proveedoresModel.agregarProveedor(req).then(
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

//modificar un proveedor existente
router.put('/modificarProveedor/:idProveedor', function (req, res, next) {
	try {
		proveedoresModel.modificarProveedor(req).then(
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
router.delete('/eliminarProveedor/:idProveedor', function (req, res, next) {
	try {
		proveedoresModel.eliminarProveedor(req).then(
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
