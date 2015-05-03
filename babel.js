'use strict';
var Babel = require('babel');

module.exports = [
  {
    ext: '.js'
  , transform: function (content, filename) {
      // Make sure to only transform your code or the dependencies you want
      if (filename.indexOf('node_modules') === -1) {

        var opts  = {
          sourceMap: 'inline'
        , filename: filename
        , sourceFileName: filename
        , stage: 0
        , optional: [
            'runtime'
          ]
        };

        var result = Babel.transform(content, opts);
        return result.code;
      }

      return content;
    }
  }
];
