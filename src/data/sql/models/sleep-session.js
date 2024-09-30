import base from '../base';
import knex from '../knex';

const name = 'SleepSession';
const tableName = 'sleep_sessions';
const pk = `${tableName}.id`;

const props = [
    'id',
    'user_id',
    'start_at',
    'end_at',
    'duration',
    'status',
    'created_at',
    'updated_at',
];

const selectableProps = props.map(each => `${tableName}.${each}`);

export default ({
    ...base({
        knex,
        name,
        tableName,
        selectableProps,
    }),
    pk,
    props,
});
