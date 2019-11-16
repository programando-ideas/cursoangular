var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');

exports.Authorize = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }

    var cert_pub = fs.readFileSync(__dirname + '/../certs/clave_publica.pem');
    var signOptions = {
        issuer: process.env.Issuer,
        audience: process.env.Audience,
        expiresIn: "1d", // 1 dia (Formato https://github.com/zeit/ms)
        algorithm: "RS256" // https://github.com/auth0/node-jsonwebtoken#algorithms-supported
    };

    var token = req.headers.authorization.replace(/['"]+/g, '');
    token = token.replace('Bearer ', '')

    console.log('Validando token: ', token);
    jwt.verify(token, cert_pub, signOptions, function(err, payload) {
        if (err) {
            console.log('Ocurrió un error al decodificar el token', err);
            return res.status(403).send({ message: 'No autorizado' });
        }
        console.log('payload: ', payload);

        //Agrega el payload a la petición
        req.user = payload;

        next();
    });
}