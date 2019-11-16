var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');

router.post('/login', async function(req, res, next) {
    var user = req.body;

    //Verifica el usuario
    if (!user)
        return res.status(500).send({ message: 'Los datos del usuario son incorrectos.' });

    if (user.Usuario !== 'usuario1' && user.Password !== '123') {
        return res.status(403).send({ message: 'Usuario/Contraseña incorrectos.' });
    }

    try {
        console.log('__dirname: ', __dirname);
        var cert_priv = fs.readFileSync(__dirname + '/../certs/clave_privada.pem');
        var signOptions = {
            issuer: process.env.Issuer,
            audience: process.env.Audience,
            expiresIn: "1d", // 1 dia (Formato https://github.com/zeit/ms)
            algorithm: "RS256" // https://github.com/auth0/node-jsonwebtoken#algorithms-supported
        };

        // https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
        jwt.sign({ cusu: user.Usuario }, cert_priv, signOptions,
            function(err, token) {

                if (err) {
                    console.log('Error al generar el token: ', err);
                    res.status(500).send({ error: "Error interno" });
                }
                console.log('token: ', token);
                res.send({ response: token });
            });

    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ error: "Error interno" });
    }
});

module.exports = router;