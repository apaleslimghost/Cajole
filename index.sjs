exports.to = function to {
	"string" => function toString {
		x @ String => x,
		x @ Array  => JSON.stringify(x),
		x @ Object => JSON.stringify(x),
		x @ {toString: Function} => x.toString()
	},
	"number" => function toNumber {
		x @ String => parseFloat(x),
		x @ Number => x
	},
	"integer" => function toInteger {
		x @ String => parseInt(x),
		x @ Number => Math.floor(x)
	}
};
