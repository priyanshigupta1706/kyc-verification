const Sequelize = require("sequelize");
const sequelize= require("./server.js")
const registeredusers = sequelize.define("registeredusers", {
  
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    
    Email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false
      }    
 }); 
 
 module.exports=registeredusers