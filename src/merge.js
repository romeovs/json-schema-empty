
// merges the array of schema's
// into one usable schema
var merge = function(schemas) {
  return schemas
    .reduce(function(prev, next) {
      return Object.assign(prev, next);
    }, {});
};

export default merge;
