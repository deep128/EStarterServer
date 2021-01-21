import sequelize from "../Connection/db"

import { DataTypes, Model} from "sequelize"

class User extends Model {

}

User.init({
    id: { type: DataTypes.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true },
    firstname: {type: DataTypes.STRING, allowNull:false},
    lastname: {type: DataTypes.STRING, allowNull:false},
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    access: {type: DataTypes.INTEGER, defaultValue: 1}
},{
    modelName: "Users",
    sequelize,
    tableName:"Users",
    timestamps:false
})

export default User