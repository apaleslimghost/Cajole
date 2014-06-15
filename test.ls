require! {
	cajole: './index.js'
	'expect.js'
}


export 'Cajole':
	'should convert strings': ->
		convert = cajole String
		expect convert (to-string: -> 'hello') .to.be 'hello'
	'should convert numbers': ->
		convert = cajole Number
		expect convert '5' .to.be 5
		expect convert '5.5' .to.be 5.5
	'should traverse objects': ->
		convert = cajole do
			foo: String
			bar: Number

		expect convert foo: {to-string: -> 'hello'}, bar: '5' .to.eql foo:'hello' bar:5
