const Sequelize = require('sequelize')
const database = require('../dataBase')

const User = database.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serialPhone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.STRING,
        allowNull: false
    },
    obs: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = User