var cajole = require('./index.js');
var expect = require('expect.js');

exports.Cajole = {
	'should convert strings': {
		'from toString objects': function() {
			var convert = cajole(String);
			expect(convert({toString: function() {return 'hello'}})).to.be('hello');
		},
		'from arrays to JSON': function() {
			var convert = cajole(String);
			expect(convert([1,"a",false])).to.be('[1,"a",false]');
		},
		'from objects to JSON': function() {
			var convert = cajole(String);
			expect(convert({foo: "bar", baz: 5})).to.be('{"foo":"bar","baz":5}');
		},
		'from primitives': function() {
			var convert = cajole(String);
			expect(convert(5)).to.be('5');
			expect(convert(true)).to.be('true');
		}
	},
	'should convert numbers': function() {
		var convert = cajole(Number);
		expect(convert('5')).to.be(5);
		expect(convert('5.5')).to.be(5.5);
		expect(convert(5)).to.be(5);
		expect(convert(5.5)).to.be(5.5);
	},
	'should convert booleans': function() {
		var convert = cajole(Boolean);
		expect(convert('true')).to.be(true);
		expect(convert('false')).to.be(false);
		expect(convert(1)).to.be(true);
		expect(convert(0)).to.be(false);
	},
	'should convert integers': function() {
		var convert = cajole('integer');
		expect(convert('5')).to.be(5);
		expect(convert('5.5')).to.be(5);
		expect(convert(5)).to.be(5);
		expect(convert(5.5)).to.be(5);
	},
	'should traverse objects': {
		'single level': function() {
			var convert = cajole({
				foo: String,
				bar: Number
			});

			expect(convert({
				foo: {toString: function() {return 'hello'}},
				bar: '5'
			})).to.eql({
				foo:'hello',
				bar:5
			});
		},
		'deeper': function() {
			var convert = cajole({
				foo: {
					bar: String,
					baz: Number
				},
				quux: Number
			});

			expect(convert({
				foo: {
					bar: 'hello',
					baz: '5.5'
				},
				quux: '5'
			})).to.eql({
				foo: {
					bar: 'hello',
					baz: 5.5
				},
				quux: 5
			});
		},
		'with a name property is not treated as a type': function() {
			var convert = cajole({name: String});
			expect(convert({name: 'string'})).to.eql({name: 'string'});
		}
	},
	'should traverse arrays': function() {
		var convert = cajole([Number, String]);
		expect(convert(['1', 'hello'])).to.eql([1, 'hello'])
	},
	'should use conversion functions': function() {
		var convert = cajole(function(x) { return x + 1 });
		expect(convert(5)).to.be(6);
	}
};
