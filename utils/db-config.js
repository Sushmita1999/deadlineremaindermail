console.log("inside dg - config 1");
const { Pool } = require("pg");

const config = {
 	host: 'localhost',
 	port: '5432',
 	database: 'postgres',
 	user: 'postgres',
 	password: 'Sweeti@261203'
};
const pool = new Pool(config);

module.exports = pool;
