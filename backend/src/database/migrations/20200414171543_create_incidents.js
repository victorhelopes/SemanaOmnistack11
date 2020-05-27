exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();

        table.string('Title').notNullable();
        table.string('Description').notNullable();
        table.decimal('value').notNullable();   
        
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.droptable('incidents');
};
