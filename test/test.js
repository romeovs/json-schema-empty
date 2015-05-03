import empty        from '../src';
import { expect }   from './instrument';
import Lab          from 'lab';

var lab = Lab.script();
var { describe
    , it } = lab;
export { lab };

describe('errors', function() {

  it('should error on unknown type', function(done) {
    var f = function() {
      empty({
        type: 'bla'
      });
    };

    expect(f).to.throw(Error);
    done();
  });

  it('should error when no schema is passed', function(done) {
    var f = function() {
      empty();
    };

    expect(f).to.throw(Error);
    done();
  });

  it('should error o', function(done) {
    var f = function() {
      empty();
    };

    expect(f).to.throw(Error);
    done();
  });

});
