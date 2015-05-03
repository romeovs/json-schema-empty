
// create smallest number that satisfies:
// it bigger than minimum and it is mulitple of multipleOf
var minmul = function(minimum, multipleOf, exclusive) {

  // if we can return 0, we do that
  if (( exclusive && minimum < 0 ) || ( !exclusive && minimum <= 0 )) {
    return 0;
  }

  var min = exclusive ? minimum + 1 : minimum;
  var rest = min % multipleOf;

  if ( rest === 0 ) {
    return min;
  }

  var sign  = multipleOf  / Math.abs(multipleOf);
  var quot = (min - rest) / multipleOf;
  return (quot + sign) * multipleOf;
};

// create smallest number that satisfies:
// it bigger than minimum and it is mulitple of multipleOf
var maxmul = function(maximum, multipleOf, exclusive) {
  // this is symmtric to minmul
  return -minmul(-maximum, multipleOf, exclusive);
};

var _integer = function(schema) {
  // todo
  var {
    multipleOf
  , minimum
  , maximum
  , exclusiveMinimum
  , exclusiveMaximum
  } = schema;

  // check what is defined
  var mo = multipleOf !== undefined
    , mi = minimum    !== undefined
    , ma = maximum    !== undefined
    ;

         if (  mo &&  mi &&  ma ) {
    return 0;
  } else if ( !mo &&  mi &&  ma ) {
    // minimum and maximum
    return minimum;
  } else if (  mo && !mi &&  ma ) {
    // multipleOf and maximum
    return maxmul(maximum, multipleOf, exclusiveMinimum);
  } else if (  mo &&  mi && !ma ) {
    return minmul(minimum, multipleOf, exclusiveMaximum);
  } else if (  mo && !mi && !ma ) {
    // only multipleOf
    return 0;
  } else if ( !mo && !mi &&  ma ) {
    // only maximum
    if ( exclusiveMaximum ) {
      return maximum > 0  ? 0 : maximum - 1;
    } else {
      return maximum >= 0 ? 0 : maximum;
    }
  } else if ( !mo &&  mi && !ma ) {
    // only minimum
    if ( exclusiveMinimum ) {
      return minimum < 0 ? 0 : minimum + 1;
    } else {
      return minimum <= 0 ? 0 : minimum;
    }
  } else if ( !mo && !mi && !ma ) {
    // totally free
    return 0;
  }
};

export default _integer;
export { minmul, maxmul };
