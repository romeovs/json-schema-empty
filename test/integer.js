import empty        from '../src';
import { expect }   from './instrument';
import quickcheck   from 'quick_check';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

// property that describes valid integers
var valid = function(min, limit, multipleOf, exclusive) {
  if ( multipleOf === 0 ) { return true; }

  min = true;
  // min or max?
  var ix = min ? 'in' : 'ax';

  var schema = {
    type: 'integer'
  , [`m${ix}imum`]: limit
  , multipleOf
  , [`exclusiveM${ix}imum`]: exclusive
  };

  var gen = empty(schema);

  // gen should be multipleOf
  var multiple = ( gen % multipleOf === 0 );

  // gen should comply to limits
  var small = min ? limit : gen;
  var big   = min ? gen   : linit;

  var limits = ( small < big ) || ( !exclusive && small <= big );

  var res = multiple && limits;

  if ( !res ) {
    console.log(schema, gen, multiple, limits);
  }
  return res;
};


describe('integers', function() {
  it('should generate correct integers', function(done) {
    var res =
      quickcheck(valid, quickcheck.bool
                      , quickcheck.int.between(-10000, 10000)
                      , quickcheck.int.between(-15, 15)
                      , quickcheck.bool);
      console.log(res.message);
      expect(res.pass).to.equal(true);
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

