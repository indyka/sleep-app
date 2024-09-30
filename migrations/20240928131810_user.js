/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id');
            table.string('username', 20).notNullable().unique();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable().defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
