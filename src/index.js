
// array <<
var _array = function() {
  // we don't know what we want so return empty array
  return [];
};
// >>

// boolean <<
var _boolean = function() {
  // just return a value
  // randomly picked at implementation time :)
  return false;
};
// >>

// integer <<
import _integer from './integer';
// >>

// number <<
var _number = function(schema) {
  // just return an integer
  return _integer(schema);
};
// >>

// null <<
var _null = function() {
  // this one was easy
  return null;
};
// >>

// object <<
var _object = function() {
  // todo
  return {};
};
// >>

// string <<
var _string = function() {
  // we do not know what we need
  // so return empty string
  return '';
};
// >>

// create empty value based on schema <<
var empty = function(schema) {
  var {
    type
  , 'default': default_
  , 'enum':    enum_
  } = schema;

  if ( default_ ) {
    // if a default is given, return that
    return default_;
  } else if ( enum_ ) {
    // if it is an enum, just use an enum value
    // json schema enums must have at least one value
    return enum_[0];
  } else {

    var t;
    if ( type instanceof Array ) {
      // select first one
      // jsons type unions always have at least one element
      t = type.sort()[0];
    } else {
      t = type;
    }

    switch ( t ) {
      case 'array':
        return _array(schema, schema);

      case 'boolean':
        return _boolean(schema, schema);

      case 'integer':
        return _integer(schema, schema);

      case 'number':
        return _number(schema, schema);

      case 'null':
        return _null(schema, schema);

      case 'object':
        return _object(schema, schema);

      case 'string':
        return _string(schema, schema);

      default:
        throw new Error(`cannot create value of type ${type}`);
    }
  }
};
// >>

export default empty;
