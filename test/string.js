import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('string schema definition', function() {

  it('string schema should yield empty string', function(done) {
    var schema = {
      type: 'string'
    };

    expect(empty(schema)).to
      .deep.equal('');

    done();
  });

  it('string schema with default should work', function(done) {
    var schema = {
      type: 'string'
    , default: 'foo'
    };

    expect(empty(schema)).to
      .deep.equal('foo');

    done();
  });
});
