const express = require('express') // importantando a o express pra variavel express
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');


const app = express(); // app vai executar a função express

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());


module.exports = app;

