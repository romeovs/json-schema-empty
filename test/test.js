import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

var throwing = function(schema, err = Error) {
  var f = function() {
    return empty(schema);
  };

  expect(f).to.throw(err);
};


describe('errors', function() {

  it('should error on unknown type', function(done) {
    throwing({
      type: 'bla'
    });
    done();
  });

  it('should error when no schema is passed', function(done) {
    throwing();
    done();
  });

  it('should throw when invalid schema is passed', function(done) {
    throwing({});
    done();
  });

});
