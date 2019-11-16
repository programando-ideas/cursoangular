var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var authGuard = require('../middleware/authjwt');

router.get('/lista', authGuard.Authorize, async function(req, res, next) {
    console.log('user: ', req.user);

    //Verifica el usuario
    if (!req.user)
        return res.status(500).send({ message: 'Los datos del usuario son incorrectos.' });

    res.send(JSON.stringify([{
            Nombre: "Cliente 1",
            Apellido: "Apellido 1",
            Edad: CalcularEdad(new Date(1956, 3, 6)),
            FechaDeNacimiento: convertDate(new Date(1956, 3, 6))
        },
        {
            Nombre: "Cliente 2",
            Apellido: "Apellido 2",
            Edad: CalcularEdad(new Date(1988, 12, 25)),
            FechaDeNacimiento: convertDate(new Date(1988, 12, 25))
        },
        {
            Nombre: "Cliente 3",
            Apellido: "Apellido 3",
            Edad: CalcularEdad(new Date(1980, 6, 6)),
            FechaDeNacimiento: convertDate(new Date(1980, 6, 6))
        }
    ], null, 4));
});

function CalcularEdad(fecha) {
    hoy = new Date();
    edad = parseInt((hoy - fecha) / 365 / 24 / 60 / 60 / 1000);
    return edad;
}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

module.exports = router;