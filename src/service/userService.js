const {User,createUser,verifyUser,updatePasswd} = require("../model/user")

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
  
const create = catchAsync(async (req, res) => {
      
    console.log("user create req",req.body)
    let tmpUser = {}
    tmpUser.name = req.body.name
    tmpUser.password = req.body.password
   
    
    createUser(tmpUser)
    .then((ret) =>{
      if(ret){
        res.json({recode:0,data:ret}); // 将结果以 JSON 格式发送回客户端
      }else{
        res.status(401).send({resultMsg:"用户已经存在"})
      }
    })
    .catch(err =>{
      console.log(err)
      res.status(401).send({resultMsg:err})
    })
  });

  const updatepawd = catchAsync(async (req, res) => {
      
    console.log("updatepawd",req.body)
    let tmpUser = {}
    tmpUser.name = req.body.name
    tmpUser.password = req.body.oldpassword

    const ret  = await verifyUser(tmpUser)

    console.log("verifyUser",ret)
    if (!ret) {
      return res.status(401).send({resultMsg:"原密码错误"})
    }

    tmpUser.password = req.body.password

    updatePasswd(tmpUser)
    .then((ret) =>{
      console.log("updatePasswd",ret)
      if(ret){
        req.session.destroy()
        res.json({recode:0,data:ret}); // 将结果以 JSON 格式发送回客户端
      }else{
        res.status(401).send({resultMsg:"密码修改失败"})
      }
    })
    .catch(err =>{
      console.log(err)
      res.status(500).send({resultMsg:err})
    })
  });

 
  module.exports ={
    create,
    updatepawd
  }