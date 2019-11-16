var express = require('express');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');
var dotenv = require('dotenv');

dotenv.config();

var app = express();

//Archivos de apis
var identidadRouter = require('./routes/identidad');
var clientesRouter = require('./routes/clientes');

//Parser de datos recibidos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cors());
app.use(helmet());

//Vinculo entre rutas y controllers
app.use('/api/identidad', identidadRouter);
app.use('/api/clientes', clientesRouter);

app.listen(3000, function() {
    console.log('El sitio inició correctamente en el puerto 3000');
});