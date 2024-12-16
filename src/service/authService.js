const {User,createUser, verifyUser} = require("../model/user")

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
  
const login = catchAsync(async (req, res) => {

    if (req.session.userId && req.session.userId === req.body.name){
        console.log("用户已经登录",req.session.userId,"\n\r")
        result = {UserValid:true,Session:req.session.userId}
        res.json(result);
        return 
      }else{
        console.log("用户开始登录，session为空")
      }
      
      const tmpUser = new User()
      tmpUser.name = req.body.name
      tmpUser.password = req.body.password
      
      verifyUser(tmpUser).then((ret) =>{
        if(ret){
          req.session.userId = tmpUser.name ; 
          result = {UserValid:ret,Session:req.session.userId}
          res.json(result); // 将结果以 JSON 格式发送回客户端
        }else{
          res.sendStatus(401)
        }
       
      })
  });
  
  const logout = catchAsync(async (req, res) => {
        return 
  });


  module.exports ={
    login,
    logout
  }