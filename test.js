var cajole = require('./index.js');
var expect = require('expect.js');

exports.Cajole = {
	'should convert strings': function() {
		var convert = cajole(String);
		expect(convert({toString: function() {return 'hello'}})).to.be('hello');
	},
	'should convert numbers': function() {
		var convert = cajole(Number);
		expect(convert('5')).to.be(5);
		expect(convert('5.5')).to.be(5.5);
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
		}
	}
};
