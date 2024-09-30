/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('followings', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable().index().references('users.id');
            table.integer('following_user_id').unsigned().notNullable().references('users.id');
            table.unique(['user_id', 'following_user_id']);
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('followings');
};
