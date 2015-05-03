import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('array schema definition', function() {

  it('should yield empty array', function(done) {
    expect(empty({
      type: 'array'
    })).to.deep.equal([]);

    done();
  });

  it('should work with tuples', function(done) {
    expect(empty({
      type: 'array'
    , items: [
        { type: 'integer' }
      , { type: 'string' }
      ]
    })).to.deep.equal([0, '']);

    done();
  });

  it('should work with minItems', function(done) {
    expect(empty({
      type: 'array'
    , items:{ type: 'integer' }
    , minItems: 5
    })).to.deep.equal([0, 0, 0, 0, 0]);

    done();
  });
});
