import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('boolean schema definition', function() {

  it('should yield false', function(done) {
    var schema = {
      type: 'boolean'
    };

    expect(empty(schema)).to
      .deep.equal(false);

    done();
  });

  it('should work with default', function(done) {
    var schema = {
      type: 'boolean'
    , default: true
    };

    expect(empty(schema)).to
      .deep.equal(true);

    done();
  });
});
