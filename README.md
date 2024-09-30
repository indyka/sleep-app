# The Sleep App

### Installation

**DB Migration**

To start database migration, you need to setup first db connection in knexfile.js, as we used knex for sql query builder in this application. Once you run the db migration, 5 new tables will be created on your database.
```sh
cp knexfile.example.js knexfile.js
# fill database connection credentials in knexfile.js

knex migrate:latest --env localhost  
```

**Install dependencies and Start Server**

To start the application in your local, you can run command as below
```sh
npm run install
npm run local
```
As the code is written in ES6, you need to compile the code for non-local usage
```sh
npm run build
export NODE_ENV={env} && npm run start
```

### Endpoints and Usage
- Register user
- Login
- Follow user
- Unfollow user
- Set sleep (clock-in/clock-out)
- Get timeline

You can check API specification by importing `Sleep.postman_collection.json` on the root of this repository.
