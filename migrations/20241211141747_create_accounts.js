/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('accounts', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('account_number').unique().notNullable();
        table.string('account_name').notNullable();
        table.string('bank').notNullable();
        table.decimal('balance', 10, 2).notNullable();
        table.timestamps(true, true);


    table.foreign('user_id').references('id').inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('accounts');
};
