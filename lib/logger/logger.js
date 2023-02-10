import isPlainObject from 'lodash/isPlainObject';
import winston from 'winston';
import getPadder from 'logform/pad-levels.js';
import { inspect } from 'util';

const levels = winston.config.syslog.levels;
const padder = getPadder({ levels });

const myFormat = winston.format((info) => {
  const padding = padder.transform({ ...info, message: '' }).message;

  if (isPlainObject(info.message))
    info.message = inspect(info.message, false, null);

  info.message = info.message.replace(/(\r?\n)/g, `$1      ${padding}`);

  return info;
});

export const logger = winston.createLogger({
  format: winston.format.combine(myFormat(), winston.format.cli()),
  level: process.env.LOG_LEVEL ?? 'info',
  levels,
  transports: [new winston.transports.Console()],
});
