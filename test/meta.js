import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('meta properties', function() {
  it('should work with oneOf', function(done) {
    var schema = {
      oneOf: [ {type: 'integer'}, {type: 'string'} ]
    };

    expect(empty(schema)).to
      .equal(0);

    done();
  });

  it('should work with anyOf', function(done) {
    var schema = {
      anyOf: [ {type: 'integer'}, {type: 'string'} ]
    };

    expect(empty(schema)).to
      .equal(0);

    done();
  });

  it('should work with allOf', function(done) {
    var schema = {
      allOf: [ {type: 'integer'}, {minimum: 5} ]
    };

    expect(empty(schema)).to
      .equal(5);

    done();
  });

  it('should work for type unions', function(done) {
    var schema = {
      type: [ 'integer', 'string' ]
    };

    expect(empty(schema)).to
      .equal(0);

    done();

  });
});

