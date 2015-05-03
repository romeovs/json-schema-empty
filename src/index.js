import deref from 'simple-json-schema-deref';
import merge from './merge';

var empty;

// array <<
var _array = function(schema, global) {
  var {
    items
  , minItems
  // , maxItems // does not matter
  } = schema;

  if ( items instanceof Array ) {
    return items.map(function(item) {
      return empty(item, global);
    });
  } else if ( minItems && items ) {
    // we need at least this amount of items
    return Array.from(new Array(minItems), () => empty(items, global));
  } else {
    // minItems is not given or we don't know item
    // type, so jsut make empty array
    return [];
  }
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
var _number = function(schema, global) {
  // just return an integer
  return _integer(schema, global);
};
// >>

// null <<
var _null = function() {
  // this one was easy
  return null;
};
// >>

// object <<
var _object = function(schema, global) {
  var {
    required
  , properties
  } = schema;

  if ( !required ) {
    // no required fields, return empty object
    return {};
  } else {
    return required
      .reduce(function(prev, next) {
        var s = properties[next];
        if ( !s ) {
          throw new Error(`property \`${next}\` not defined on object`);
        }
        prev[next] = empty(s, global);
        return prev;
      }, {});
  }
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
empty = function(schema, global) {
  var {
    type
  , 'default': default_  // rename default to default_
  , 'enum':    enum_     // rename enum to enum_
  // , $ref
  , oneOf
  , anyOf
  , allOf
  } = schema;

  if ( default_ ) {
    // if a default is given, return that
    return default_;
  } else if ( enum_ ) {
    // if it is an enum, just use an enum value
    // json schema enums must have at least one value
    return enum_[0];
  // } else if ( $ref ) {
  //   // a ref is passed, deref it and go on from there
  //   var s = deref($ref, global);
  //   return empty(s, global);
  } else if ( type ) {
    // type is given
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
        return _array(schema, global);

      case 'boolean':
        return _boolean(schema, global);

      case 'integer':
        return _integer(schema, global);

      case 'number':
        return _number(schema, global);

      case 'null':
        return _null(schema, global);

      case 'object':
        return _object(schema, global);

      case 'string':
        return _string(schema, global);

      default:
        throw new Error(`cannot create value of type ${type}`);
    }
  } else if ( allOf ) {
    // merge schema's and follow that
    return empty(merge(allOf), global);
  } else if ( anyOf ) {
    // any of the schema's is ok so pick the first
    // todo: is this deterministic?
    return empty(anyOf[0], global);
  } else if ( oneOf ) {
    // one of the schema's is ok so pick the first
    // todo: is this deterministic?
    return empty(oneOf[0], global);
  }
};
// >>

var make = function(schema) {
  var s = deref(schema);
  return empty(s, s);
};

export default make;

