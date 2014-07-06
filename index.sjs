exports.to = function to {
	"string" => function toString {
		x @ String => x,
		x @ Array  => JSON.stringify(x),
		x @ Object => JSON.stringify(x),
		x @ {toString: Function} => x.toString(),
		x => throw new TypeError("Cannot convert " + x + " to string (except I just did lol)");
	},
	"number" => function toNumber {
		x @ String => parseFloat(x),
		x @ Number => x,
		x => throw new TypeError("Cannot convert " + x + " to number");
	},
	"integer" => function toInteger {
		x @ String => parseInt(x),
		x @ Number => Math.floor(x),
		x => throw new TypeError("Cannot convert " + x + " to integer");
	}
};
