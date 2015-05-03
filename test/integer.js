import { minmul
       , maxmul }   from '../src/integer';
import empty        from '../src';
import { expect }   from './instrument';
import quickcheck   from 'quickcheck';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

var validmin = function(min, mul, exclusive) {
  var gen = minmul(min, mul, exclusive);
  var mulok = (gen % mul) === 0;
  if ( exclusive ) {
    return mulok && gen >  min;
  } else {
    return mulok && gen >= min;
  }
};

var validmax = function(max, mul, exclusive) {
  var gen = maxmul(max, mul, exclusive);
  var mulok = (gen % mul) === 0;
  if ( exclusive ) {
    return mulok && gen <  max;
  } else {
    return mulok && gen <= max;
  }
};

var arbInt = function() {
  return (Math.round(Math.random()) * 100000) - 50000;
};

var arbSmallInt = function() {
  return (Math.round(Math.random()) * 30) - 15;
};

describe('integers', function() {
  it('should generate correct integers, min', function(done) {
    var res =
      quickcheck.forAll( validmin
                       , arbInt
                       , arbSmallInt
                       , quickcheck.arbBool);
      expect(res).to.equal(true);
      done();
  });

  it('should generate correct integers, max', function(done) {
    var res =
      quickcheck.forAll( validmax
                       , arbInt
                       , arbSmallInt
                       , quickcheck.arbBool);
      expect(res).to
        .equal(true);
      done();
  });

  it('should work with default', function(done) {
    var schema = {
      type: 'boolean'
    , default: 42
    };

    expect(empty(schema)).to
      .deep.equal(42);

    done();
  });
});

