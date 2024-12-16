const { Sequelize} = require('sequelize')
const env = require("../config/config")

const dbuser = process.env.dbuser
const dbpw = process.env.dbpassword

const kpsdb = new Sequelize('kpsdatabase', dbuser, dbpw, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    },
    logging:process.debug ? true:false
});


module.exports =  kpsdb

