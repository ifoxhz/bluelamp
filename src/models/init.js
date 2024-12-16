const { Sequelize,DataTypes, NOW} = require('sequelize')
const bcrypt = require('bcrypt')
const {UserRole,User} = require('./user')


const kpssql = new Sequelize('kpsdatabase', 'root', process.env.dbpassword, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});





async function createAdminUser(){

  const saltRounds = 5; // 盐值轮数，越高越安全但加密时间也会增加
  const password = await bcrypt.hash("12345678", saltRounds);
  const newUser = await User.create({
        name:"admin",
        email:"admin@kms.com",
        password,
        phone:"12312341234",
        role:UserRole.ADMIN
      });

}



async function main(){
  createAdminUser()
}

main()

