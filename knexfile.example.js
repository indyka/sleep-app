module.exports = {
    localhost: {
        client: 'mysql2',
        connection: {
            host: '',
            database: 'sleep_app',
            user: '',
            password: '',
            port: ''
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
};
