import {
  type ConnectionOptions,
} from '../../../src/types.js';
import {
  parseDsn,
} from '../../../src/utilities/index.js';
import test from 'ava';

const testParse = test.macro((t, connectionOptions: ConnectionOptions) => {
  t.deepEqual(parseDsn(t.title), connectionOptions);
});

test('postgresql://', testParse, {});
test('postgresql://localhost', testParse, {
  host: 'localhost',
});
test('postgresql://localhost:5432', testParse, {
  host: 'localhost',
  port: 5_432,
});
test('postgresql://localhost/foo', testParse, {
  databaseName: 'foo',
  host: 'localhost',
});
test('postgresql://foo@localhost', testParse, {
  host: 'localhost',
  username: 'foo',
});
test('postgresql://foo:bar@localhost', testParse, {
  host: 'localhost',
  password: 'bar',
  username: 'foo',
});
test('postgresql://localhost/?options=-c%20search_path%3Dfoo', testParse, {
  host: 'localhost',
  options: '-c search_path=foo',
});
test('postgresql://localhost/?&application_name=baz', testParse, {
  applicationName: 'baz',
  host: 'localhost',
});
test('postgresql://fo%2Fo:b%2Far@localhost/ba%2Fz', testParse, {
  databaseName: 'ba/z',
  host: 'localhost',
  password: 'b/ar',
  username: 'fo/o',
});
