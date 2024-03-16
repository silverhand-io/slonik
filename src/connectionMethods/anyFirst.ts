import {
  DataIntegrityError,
} from '../errors.js';
import {
  type InternalQueryMethod,
} from '../types.js';
import {
  createQueryId,
} from '../utilities/index.js';
import {
  any,
} from './any.js';

export const anyFirst: InternalQueryMethod = async (log, connection, clientConfigurationType, slonikSql, inheritedQueryId) => {
  const queryId = inheritedQueryId ?? createQueryId();

  const rows = await any(log, connection, clientConfigurationType, slonikSql, queryId);

  if (rows.length === 0) {
    return [];
  }

  const firstRow = rows[0];

  const keys = Object.keys(firstRow as Record<string, unknown>);

  if (keys.length !== 1) {
    log.error({
      queryId,
    }, 'result row has no columns');

    throw new DataIntegrityError();
  }

  const firstColumnName = keys[0];

  return (rows as Array<Record<string, unknown>>).map((row) => {
    return row[firstColumnName];
  });
};
