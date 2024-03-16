import {
  DataIntegrityError,
  NotFoundError,
} from '../../../src/errors.js';
import {
  createSqlTag,
} from '../../../src/factories/createSqlTag.js';
import {
  createPool,
} from '../../helpers/createPool.js';
import test from 'ava';

const sql = createSqlTag();

test('returns the first row', async (t) => {
  const pool = await createPool();

  pool.querySpy.returns({
    rows: [
      {
        foo: 1,
      },
    ],
  });

  const result = await pool.one(sql`SELECT 1`);

  t.deepEqual(result, {
    foo: 1,
  });
});

test('throws an error if no rows are returned', async (t) => {
  const pool = await createPool();

  pool.querySpy.returns({
    rows: [],
  });

  const error = await t.throwsAsync(pool.one(sql`SELECT 1`));

  t.true(error instanceof NotFoundError);
});

test('throws an error if more than one row is returned', async (t) => {
  const pool = await createPool();

  pool.querySpy.returns({
    rows: [
      {
        foo: 1,
      },
      {
        foo: 2,
      },
    ],
  });

  const error = await t.throwsAsync(pool.one(sql`SELECT 1`));

  t.true(error instanceof DataIntegrityError);
});
