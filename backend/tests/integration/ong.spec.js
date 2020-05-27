const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', ()=>{
    beforeEACH(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterALL(async()=>{
        await connection.destroy();
    }),

    it('should be able to create create a new ong', async () => {
        const response = await request(app)
            .post('./ongs')
            .send({
                name: 'APAD2',
                email: 'contato@dfa.com',
                whatsapp: '47000000000',
                city:'Rio do sul',
                uf: 'SC',
            });
    })
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
}); 
