const sequelize = require("../Connection/db")
const Sequelize = require("sequelize")

const { DataTypes, Model } = require("sequelize")

class User extends Model {

}

User.init({
    id: { type: Sequelize.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false }
},{
    modelName: "Users",
    sequelize,
    tableName:"Users",
    timestamps:false
})

module.exports = User