import isPlainObject from 'lodash.isplainobject';

// Define log levels.
const levels = {
  emerg: { value: 0, console: 'error' },
  alert: { value: 1, console: 'error' },
  crit: { value: 2, console: 'error' },
  error: { value: 3, console: 'error' },
  warning: { value: 4, console: 'warn' },
  notice: { value: 5, console: 'info' },
  info: { value: 6, console: 'info' },
  debug: { value: 7, console: 'debug' },
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
  if (!levels[level]) throw new Error('unknown log level');

  if (levels[level].value > levels[process.env.LOG_LEVEL ?? 'info'].value)
    return;

  for (const item of items) {
    console[levels[level].console ?? 'log'](
      `${level}:${padding[level]} `,
      isPlainObject(item)
        ? JSON.stringify(item, undefined, 2).replace(
            /(\r?\n)/g,
            `$1${level}:${padding[level]}   `
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
