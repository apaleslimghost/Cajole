# Cajole

Coax data into formats

```
npm install cajole
```

## Examples
See also the [tests](/test.js)

```javascript
var cajole = require('cajole');

var convertToString = cajole(String);
convertToString(5); //⇒ "5"
convertToString('hello'); //⇒ "hello"
convertToString(true); //⇒ "true"

var convertToNumber = cajole(Number);
convertToNumber('5'); //⇒ 5
convertToNumber('5.5'); //⇒ 5.5

var convertToInteger = cajole('integer');
convertToInteger('5'); //⇒ 5
convertToInteger('5.5'); //⇒ 5

var convertToBool = cajole(Boolean);
convertToBool('true'); //⇒ true
convertToBool(1); //⇒ true
convertToBool(0); //⇒ false

var convertToSchema = cajole({
  foo: String,
  bar: ['integer', String],
  bax: {quux: Boolean}
});

convertToSchema({
  foo: {toString: function() { return 'hello' },
  bar: ['5', false],
  bax: {quux: 1}
}); /* ⇒ {
  foo: "hello",
  bar: [5, "false"],
  bax: {quux: true}
} */

```

## Licence
MIT. &copy; 2014 Matt Brennan
