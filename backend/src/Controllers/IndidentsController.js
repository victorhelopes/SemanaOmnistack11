const connection = require('../database/connection');

module.exports= {
    async index(request, response)
    {
        const { page = 1 } = request.query;
         
        const [count] = await connection('incidents').count();
         
        const index = await connection('Incidents')
        .join('ongs', 'ongs.id', '=' , 'incidents.ong_id')
        .limit(5)
        .offset((page-1) *5)
        .select(['incidents.*', 'ongs.name', 'ongs.email' ,'ongs.Whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(index);
    },

    async create(request, response)
    {
        const {Title, Description, value} = request.body;
        const ong_id = request.headers.authorization; // ong id vem do cabeçalho de quem ta conectado. No cabeçalho possui as infos da ong conectada

        const[id] = await connection('incidents').insert({
            Title,
            Description,
            value,
            ong_id,
        });
        return response.json({id});
    },

    async delete(request, response)
    {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents').where('id', id).select('ong_id').first();
        
        if(incidents.ong_id !== ong_id){    
            return response.status(401).json({error : 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
}