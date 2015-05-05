# json-schema-empty

[![Build Status](https://img.shields.io/travis/romeovs/json-schema-empty.svg?style=flat-square)][travis]
[![Coverage Status](https://img.shields.io/coveralls/romeovs/json-schema-empty.svg?style=flat-square)][coveralls]
[![Dependencies](https://img.shields.io/david/romeovs/json-schema-empty.svg?style=flat-square)][david]
[![devDependencies](https://img.shields.io/david/dev/romeovs/json-schema-empty.svg?style=flat-square)][david-dev]
[![license](https://img.shields.io/badge/license-ISC-373737.svg?style=flat-square)][license]
[![gitter](https://img.shields.io/badge/GITTER-join%20chat%20→-00d86e.svg?style=flat-square)][gitter]


Generate simple data that matches a json schema.

All libraries that generate data from a json-schema I could find
generate random data that conforms to a json schema.  This is nice
for testing but is not well-suited for generating default data for
forms for example.

`json-schema-empty` fills another niche.  The data it generates
conforms to the following qualities:
  - data is generated deterministically, if the schema is the same,
   the date will be the same.
  - the data is as simple as possible
  - the data conforms to the *form* specified in the schema.  It will
    sometimes fail to be valid according to the schema however.  The reason
    for this is simple: you cannot generate all values automatically (see the
    [rules](#rules) section for more info on this).

## Usage
To install `json-schema-empty`, run:
```sh
npm install romeovs/json-schema-empty --save
```

The api is simple:
```js
import empty from 'json-schema-empty';

var schema = {
  type: 'object'
, properties: {
    foo: {
      type: 'integer'
    , minimum: 12
    , multipleOf: 5
    }
  , bar: {
      type: 'array'
    , items: { type: 'integer' }
    , minItems: 3
    }
  , baz: {
      type: 'string'
      minLength: 5
    }
  }
, required: [ 'foo', 'bar', 'baz' ]
};

console.log(empty(schema));

// logs:
// {
//   foo: 15,
//   bar: [ 0, 0, 0 ],
//   baz: ''
// }
```

## Rules

  - **string**: because it impossible to guess what the string
    content should be, even when patterns and length limits are given,
    a string schema always results in the empty string: `''`.

  - **integer**: `json-schema-empty` tries to satisfy the `minimum`, `maximum`
    and `multipleOf` constraints whenever possible wth the additional property
    that, when it is possible, `0` is returned.

  - **number**: just follows the `integer` schema.
  - **object**: tries to create a minimal object with as few keys as possible.
    Only keys that are in the `required` array are generated.

    Object size is ignored completely, for the same reason that the
    strings are empty: we cannot guess the keys.

  - **array**: when the `item` type is given, and `minItems` is given,
    the shortest array that matches this is generated.  It also works
    when `items` is a tuple.  `maxItems` is ignored.  Whenever possible,
    the empty array is returned.

  - **boolean**: always results in `false`.
  - **null**: always results in `null`.

  - **oneOf**, **anyOf**: selects one of the accepted types and goes from there.
  - **allOf**: `json-schema-empty` merges all schemas and works from that schema
    to generate a value.
  - **enum**: selects the first possible value.
  - `$ref`: just works!

Whenever specified, `json-schema-empty` uses the `default` value (even if it
does not match the schema).

### License
This code is licensed under the [ISC license][license]

[travis]:    https://travis-ci.org/romeovs/json-schema-empty
[coveralls]: https://coveralls.io/r/romeovs/json-schema-empty?branch=master
[david]:     https://david-dm.org/romeovs/json-schema-empty
[david-dev]: https://david-dm.org/romeovs/json-schema-empty#info=devDependencies
[license]:   ./LICENSE
[gitter]:    https://gitter.im/romeovs/json-schema-empty?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
