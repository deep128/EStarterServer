import { any } from "sequelize/types/lib/operators"
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('EStarter','root','password',{
    host: '127.0.0.1',
    dialect: 'mysql'
})

export default sequelize