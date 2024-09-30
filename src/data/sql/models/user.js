import base from '../base';
import knex from '../knex';

const name = 'User';
const tableName = 'users';
const pk = `${tableName}.id`;

const props = [
    'id',
    'username',
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
