var express = require('express');
var router = express.Router();

//requerir el modelo
var usuariosModel = require('../models/usuariosModel');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

	next();
});

//obtener todos los registos de la tabla usuarios
router.get('/listarUsuarios', function (req, res, next) {
	try {
		//web service
		usuariosModel.listarUsuarios(req).then(
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

//Agregar un nuevo usuario
router.post('/agregarUsuario', function (req, res, next) {
	try {
		//web service
		usuariosModel.agregarUsuario(req).then(
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

//modificar un usuario existente
router.put('/modificarUsuario/:idUsuario', function (req, res, next) {
	try {
		usuariosModel.modificarUsuario(req).then(
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

//eliminar un usuario existente
router.delete('/eliminarUsuario/:idUsuario', function (req, res, next) {
	try {
		usuariosModel.eliminarUsuario(req).then(
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
