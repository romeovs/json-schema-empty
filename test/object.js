import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };


describe('object schema definition', function() {

  it('should create the empty object when no required fields are given', function(done) {
    var schema = {
      type: 'object'
    };
    expect(empty(schema)).to
      .deep.equal({});

    done();
  });

  it('should create the fields when they are required', function(done) {
    var schema = {
      type: 'object'
    , properties: {
        foo: {
          type: 'object'
        }
      , bar: {
          type: 'object'
        }
      }
    , required: ['foo', 'bar']
    };
    expect(empty(schema)).to
      .contain.all.keys(['foo', 'bar']);

    done();
  });

  it('should work with default', function(done) {
    var def = {
      foo: 'bar'
    , baz: 42
    };

    var schema = {
      type: 'object'
    , default: def
    };

    expect(empty(schema)).to
      .deep.equal(def);

    done();
  });
});
