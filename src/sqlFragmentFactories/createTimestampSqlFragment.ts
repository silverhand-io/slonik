import {
  InvalidInputError,
} from '../errors.js';
import {
  type SqlFragment,
  type TimestampSqlToken,
} from '../types.js';

export const createTimestampSqlFragment = (token: TimestampSqlToken, greatestParameterPosition: number): SqlFragment => {
  if (!(token.date instanceof Date)) {
    throw new InvalidInputError('Timestamp parameter value must be an instance of Date.');
  }

  return {
    sql: 'to_timestamp($' + String(greatestParameterPosition + 1) + ')',
    values: [
      String(token.date.getTime() / 1_000),
    ],
  };
};
