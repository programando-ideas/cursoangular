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
            nombre: "Cliente 1",
            apellido: "Apellido 1",
            edad: CalcularEdad(new Date(1956, 3, 6)),
            fechaDeNacimiento: convertDate(new Date(1956, 3, 6))
        },
        {
            nombre: "Cliente 2",
            apellido: "Apellido 2",
            edad: CalcularEdad(new Date(1988, 12, 25)),
            fechaDeNacimiento: convertDate(new Date(1988, 12, 25))
        },
        {
            nombre: "Cliente 3",
            apellido: "Apellido 3",
            edad: CalcularEdad(new Date(1980, 6, 6)),
            fechaDeNacimiento: convertDate(new Date(1980, 6, 6))
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