'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('Users',{
      id: {type: Sequelize.INTEGER,unique:true,allowNull:false,primaryKey:true,autoIncrement:true},
      username: {type: Sequelize.STRING,allowNull:false},
      password: {type: Sequelize.STRING,allowNull:false},
      email: {type: Sequelize.STRING,allowNull:false}
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
