/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('sleep_sessions', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable().index().references('users.id');
            table.integer('start_at').notNullable();
            table.integer('end_at').nullable();
            table.integer('duration').nullable();
            table.enu('status', ['OPEN', 'COMPLETED']).notNullable().defaultTo('OPEN');
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable().defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('sleep_sessions');
};
