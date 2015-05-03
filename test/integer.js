// import { minmul
//        , maxmul }   from '../src/integer';
import empty        from '../src';
import { expect }   from './instrument';
import quickcheck   from 'quickcheck';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

var valid = function(min, limit, multipleOf, exclusive) {
  var gen, schema;
  if ( min ) {
    schema = {
      type: 'integer'
    , minimum: limit
    , multipleOf
    , exclusiveMinimum: exclusive
    };
    gen = empty(schema);
    if (( exclusive && gen <= limit ) || ( !exclusive && gen < limit )) {
      return false;
    }
  } else {
    schema = {
      type: 'integer'
    , maximum: limit
    , multipleOf
    , exclusiveMaximum: exclusive
    };
    gen = empty(schema);
    if (( exclusive && gen >= limit ) || ( !exclusive && gen > limit )) {
      return false;
    }
  }

  if ( gen % multipleOf !== 0 ) {
    return false;
  }

  return true;
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
      quickcheck.forAll( valid
                       , quickcheck.arbBool
                       , arbInt
                       , arbSmallInt
                       , quickcheck.arbBool);
      expect(res).to.equal(true);
      done();
  });

  it('should return 0 when no constraints are given', function(done) {
    var schema = {
      type: 'integer'
    };

    expect(empty(schema)).to
      .deep.equal(0);

    done();
  });

  it('should return minimum if divisible by multipleOf', function(done) {
    var schema = {
      type: 'integer'
    , minimum: 10
    , multipleOf: 2
    };

    expect(empty(schema)).to
      .deep.equal(10);

    done();
  });

  it('should return min if min, max and multiple are given', function(done) {
    var schema = {
      type: 'integer'
    , minimum: 10
    , maximum: 20
    , multipleOf: 2
    };

    expect(empty(schema)).to
      .deep.equal(10);
    done();
  });

  it('should return min if min, max and multiple are given and 0 is not in range', function(done) {
    var schema = {
      type: 'integer'
    , minimum: 10
    , maximum: 20
    , multipleOf: 2
    };

    expect(empty(schema)).to
      .deep.equal(10);
    done();
  });

  it('should return min if min, max and multiple are given', function(done) {
    var schema = {
      type: 'integer'
    , minimum: -10
    , maximum: 20
    , multipleOf: 2
    };

    expect(empty(schema)).to
      .deep.equal(0);
    done();
  });

  it('should return 0 if only multipleOf is given', function(done) {
    var schema = {
      type: 'integer'
    , multipleOf: 2
    };

    expect(empty(schema)).to
      .deep.equal(0);
    done();
  });

  it('should return 0 if maximum allows it', function(done) {
    var schema = {
      type: 'integer'
    , multipleOf: 2
    , maximum: 10
    };

    expect(empty(schema)).to
      .deep.equal(0);
    done();
  });

  it('should work with only minimum', function(done) {
    expect(empty({
      type: 'integer'
    , minimum: 5
    })).to
      .deep.equal(5);

    expect(empty({
      type: 'integer'
    , minimum: -5
    , exclusiveMinimum: true
    })).to
      .deep.equal(0);

    expect(empty({
      type: 'integer'
    , minimum: -5
    })).to
      .deep.equal(0);

    expect(empty({
      type: 'integer'
    , minimum: 5
    , exclusiveMinimum: true
    })).to
      .deep.equal(6);

    done();
  });

  it('should work with only maximum', function(done) {
    expect(empty({
      type: 'integer'
    , maximum: 5
    })).to
      .deep.equal(0);

    expect(empty({
      type: 'integer'
    , maximum: 5
    , exclusiveMaximum: true
    })).to
      .deep.equal(0);

    expect(empty({
      type: 'integer'
    , maximum: 5
    })).to
      .deep.equal(0);

    expect(empty({
      type: 'integer'
    , maximum: -5
    , exclusiveMaximum: true
    })).to
      .deep.equal(-6);

    expect(empty({
      type: 'integer'
    , maximum: -5
    })).to
      .deep.equal(-5);

    done();
  });

  it('should work with default', function(done) {
    var schema = {
      type: 'integer'
    , default: 42
    };

    expect(empty(schema)).to
      .deep.equal(42);

    done();
  });
});

