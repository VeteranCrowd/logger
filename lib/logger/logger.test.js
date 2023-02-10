/* eslint-env mocha */

// test imports
import chai from 'chai';
chai.should();

import { logger } from './logger.js';

describe('logger', function () {
  it('should log', function () {
    logger.emerg('emergency', { a: 1, b: 2 });
    logger.alert('alert', { a: 1, b: 2 });
    logger.crit('critical', { a: 1, b: 2 });
    logger.error('error', { a: 1, b: 2 });
    logger.warning('warning', { a: 1, b: 2 });
    logger.notice('notice', { a: 1, b: 2 });
    logger.info('informational', {
      a: 1,
      b: 2,
      c: {
        a: 1,
        b: 2,
        c: [
          { a: 1, b: 2 },
          { a: 1, b: 2 },
          { a: 1, b: 2 },
          { a: 1, b: 2 },
        ],
      },
    });
    logger.debug('debug', { a: 1, b: 2 });

    true.should.be.ok;
  });
});
