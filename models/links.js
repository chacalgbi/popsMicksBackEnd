const Sequelize = require('sequelize')
const database = require('../dataBase')

const Link = database.define('link', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    linkAdress: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Link