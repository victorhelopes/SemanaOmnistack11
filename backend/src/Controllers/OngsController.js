const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection');

 module.exports = {
    async index(request, response) ///listas as ongs
    {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response)
    {
       const { name, email, WhatsApp, city, uf  } = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert(
        {
            id,
            name,
            email,
            WhatsApp,
            city,
            uf,
        });

        return response.json({ id });
    }
};