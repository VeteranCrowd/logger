import isPlainObject from 'lodash.isplainobject';
import isNil from 'lodash.isnil';
import { inspect } from 'util';

// Define log levels.
const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

// Calculate max level length.
const maxLevelLength = Object.keys(levels).reduce(
  (max, level) => Math.max(max, level.length),
  0
);

// Calculate padding for each log level.
const padding = Object.keys(levels).reduce(
  (padding, level) => ({
    ...padding,
    [level]: ' '.repeat(maxLevelLength - level.length),
  }),
  {}
);

// Log items to the console with level label
const log = (level, ...items) => {
  if (
    isNil(levels[process.env.LOG_LEVEL ?? 'info']) ||
    levels[level] > levels[process.env.LOG_LEVEL]
  )
    return;

  for (const item of items) {
    console.log(
      `${level}:${padding[level]} `,
      isPlainObject(item)
        ? inspect(item, false, null).replace(
            /(\r?\n)/g,
            `$1${' '.repeat(maxLevelLength)}   `
          )
        : item
    );
  }
};

// Export logger.
export const logger = Object.keys(levels).reduce(
  (logger, level) => ({
    ...logger,
    [level]: (...items) => log(level, ...items),
  }),
  { log }
);
