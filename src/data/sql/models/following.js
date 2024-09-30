import base from '../base';
import knex from '../knex';

const name = 'Following';
const tableName = 'followings';
const pk = `${tableName}.id`;

const props = [
    'id',
    'following_user_id',
    'user_id',
    'created_at',
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
