const express = require('express');
const { celebrate, Segments, Joi} = require('celebrate');  // celebrate server para verificar se todos os dados estão corretos

const OngController = require('./Controllers/OngsController');
const IncidentsController = require('./Controllers/IndidentsController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/ProfileController');

const routes = express.Router();

routes.post('/session', SessionController.index);


routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name:Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,OngController.create);


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileController.index);


routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentsController.index);

routes.post('/incidents', IncidentsController.create); //fazer a verificação desse também

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,IncidentsController.delete);


module.exports = routes;


