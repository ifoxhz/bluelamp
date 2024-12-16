const { Sequelize,DataTypes} = require('sequelize')
const kpssql = require("./index.js")

const bcrypt = require('bcrypt')
const logger = require("../config/logger")

// const kpssql = new Sequelize('kpsdatabase', 'root', 'yongkps', {
//     host: 'localhost',
//     dialect: 'mysql',
//     define: {
//         freezeTableName: true
//     }
// });
const UserRole ={
  ADMIN:100,
  OPERATOR:200
}

const saltRounds = 5; // 盐值轮数，越高越安全但加密时间也会增加

async function CreateUserTable() {

  
    const options = {}           //Config?.Database?.force?{force:true}:null

    await User.sync(options); // 使用 { force: true } 可以强制重新创建表
    console.log('Tables User created!',options);

    // if ( Config?.Database.force){
    //   const newUser = await User.create({
    //     name:"admin",
    //     email:"admin@etsme.com",
    //     password:"admin123",
    //     phone:"12312341234",
    //     role:UserRole.ADMIN
    //   });
  
    // }    

    // User.findAll().then((data) =>{
    //   console.log("user table",data)
    // })
}

const User = kpssql.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: true,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  })

CreateUserTable()

async function createUser(userIns) {
  return new Promise(async (resolve,reject) => {
    try {
        
        let query = {
          where: { name: userIns.name } 
        }
        console.log("createUser",query)
        const tmpUser = await User.findOne(query)
        if (tmpUser){
          console.log("tmpUser",tmpUser)
          return reject(new Error("用户已经存在"))
        }
        //salt 密码
        userIns.password = await bcrypt.hash(userIns.password, saltRounds);

        const user = await User.create(userIns);
        console.log('User created:', user.toJSON());
        resolve(user)
    } catch (error) {
      console.error('Error creating user:', error);
      reject(error)
    }
  })
}

async function updatePasswd(userInfo){

  return new Promise(async (resolve,reject) => {

    let newValues = {
    }
    
    newValues.password = await bcrypt.hash(userInfo.password, saltRounds);
  
    let query = {
      where:{name:userInfo.name}
    }
    try {
      const tmpproc = await User.update(newValues,query)
      logger.info(`updatePasswd return ${tmpproc}`)
      resolve(tmpproc)
    }catch(err){
      reject(err)
    }
   
  })
  

}


async function verifyUser(userInfo){
  
  return new Promise( async (resolve) => {
    if (!userInfo.name){
      resolve(false)
    }
    try {
      query={
        where: {
          name: userInfo.name
        }
      }
        const tmpUser = await  User.findOne(query)
        console.log("tmpUser",tmpUser)
        if (!tmpUser){
          resolve(false)
          return
        }
        let isMatch = await bcrypt.compare(userInfo.password, tmpUser.password)
        if (isMatch){
          return resolve(true)
             
        }else{
          return resolve(false)
        }
    } catch (error) {
      console.error('Error query user:', error);
      resolve(false)
    }
  })
}

module.exports = {
    User,
    createUser,
    verifyUser,
    updatePasswd,
    UserRole
}