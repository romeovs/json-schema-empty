import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('null schema definition', function() {

  it('should yield null', function(done) {
    var schema = {
      type: 'null'
    };

    expect(empty(schema)).to
      .deep.equal(null);

    done();
  });
});
