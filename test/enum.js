import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('enum schema definition', function() {

  it('should yield first enum value', function(done) {
    var schema = {
      enum: [
        42
      ]
    };

    expect(empty(schema)).to
      .equal(42);

    done();
  });
});
