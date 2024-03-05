const {Pool} = require('pg');


const {db} = require('./config');
const pool = new Pool(
    {
        user: db.user,
        host: db.host,
        password: db.password,
        port: db.port,
        database: db.name,
    }
)


module.exports = pool;