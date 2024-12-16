const winston = require('winston');
const config = require('./config');
const DailyRotateFile = require('winston-daily-rotate-file');
const { SPLAT } = require('triple-beam');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// 创建一个 DailyRotateFile 
const transport = new DailyRotateFile ({
  level: process.env.development ? 'debug' : 'info',
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '10m',
  maxFiles: '7d',
  zippedArchive: true
});


const timezoned = () => {
  return new Date().toLocaleString('zh-CN');
}

const customFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
      log += ` ${JSON.stringify(metadata, null, 2)}`;
  }
  return log;
});

function isObject(value) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

const formatObject = (obArg) => {
  if (isObject(obArg)) {
    return JSON.stringify(obArg);
  }
  return obArg;
}

const all = winston.format((info) => {
  const splat = info[SPLAT] || [];
  const message = formatObject(info.message);
  const rest = splat.map(formatObject).join(' ');
  const stackStr = info.stack ? formatObject(info.stack) : "";
  info.message = `${message} ${rest} ${stackStr}`;
  return info;
});

const logger = winston.createLogger({
  level: process.env.development ? 'debug' : 'info',
  format: winston.format.combine(
    all(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.timestamp({format: timezoned}),
    winston.format.printf(({ level, message,timestamp}) => `${timestamp} ${level}: ${message}`)
    // customFormat
  ),
  transports: [
    transport
  ],
});

module.exports = logger;
