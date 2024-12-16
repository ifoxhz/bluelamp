const express = require('express');
const session = require('express-session'); 
const env = require("./config/config")
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes")
const logger = require("./config/logger")

//最后加载，需要其他模块都加载
const KaaSPolling = require("./kaas/kaas")

app.use(session({ 
  secret: 'KPS-secret-backend', 
  resave: false, 
  saveUninitialized: true, 
  cookie: {
    maxAge: 60 * 60 * 1000, // 设置会话超时时间为 60 分钟（以毫秒为单位）
  }
}))
// 使用 body-parser 中间件解析 POST 请求的请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/api", routes)




//微服务入口

let running_flag = true
let serverInstance = null

function serviceRun(){

  if (process.env.RUN_MODE === "SERVER"){
      // 启动服务器
      const port = env.PORT ? env.PORT:4000
      serverInstance = app.listen(port, () => {
        logger.info(`Server is listening on port ${port}`);
      });
  }else if(process.env.RUN_MODE === "KAAS"){
    
    serverInstance = app.listen(0, () => {
      KaaSPolling(running_flag)
      logger.info(`Server is kaas`);
    });
   

  }else{
    logger.error("请配置服务模式，SERVER 或者 KAAS")
    return 
  }

}
serviceRun()