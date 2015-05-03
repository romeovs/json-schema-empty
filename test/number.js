import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('numbers', function() {
  it('should return 0 when possible', function(done) {
    var schema = {
      type: 'number'
    };

    expect(empty(schema)).to
      .equal(0);
    done();
  });

  it('should use default', function(done) {
    var schema = {
      type: 'number'
    , default: 42
    };

    expect(empty(schema)).to
      .equal(42);
    done();
  });

  it('should work with non-integer multipleOf', function(done) {
    var schema = {
      type: 'number'
    , multipleOf: 3.5
    , minimum: 5
    };

    expect(empty(schema)).to
      .equal(7);
    done();
  });
});
