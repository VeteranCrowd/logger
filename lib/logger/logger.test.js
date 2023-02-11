/* eslint-env mocha */

// test imports
import chai from 'chai';
chai.should();

import { Logger } from './logger.js';
const logger = new Logger();

describe('logger', function () {
  it('should log levels under debug', function () {
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

  it('render', function () {
    console.log(
      logger.render('info', 'informational', {
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
      })
    );

    true.should.be.ok;
  });

  it('should log date', function () {
    logger.info(new Date());

    true.should.be.ok;
  });

  it('should log set', function () {
    logger.info(new Set([1, 2, 3]));

    true.should.be.ok;
  });

  it('truncates', function () {
    logger
      .truncate(
        50,
        'this is a very long string this is a very long string this is a very long string',
        {
          value:
            'this is a very long string this is a very long string this is a very long string',
        }
      )
      .info();

    true.should.be.ok;
  });

  it('circular', function () {
    const a = { a: 1 };
    a.b = a;

    logger.info(a);

    true.should.be.ok;
  });
});
