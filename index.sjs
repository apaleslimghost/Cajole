function to {
	"string" => function toString {
		x @ String => x,
		x @ {toJson:   Function} => JSON.stringify(x),
		x @ {toString: Function} => x.toString(),
		x => {throw new TypeError("Cannot convert " + x + " to string (except I just did lol)");}
	},
	"number" => function toNumber {
		x @ String => parseFloat(x),
		x @ Number => x,
		x => {throw new TypeError("Cannot convert " + x + " to number");}
	},
	"integer" => function toInteger {
		x @ String => parseInt(x),
		x @ Number => Math.floor(x),
		x => {throw new TypeError("Cannot convert " + x + " to integer");}
	}
};

function type {
	x if x === String => "string",
	x if x === Number => "number",
	x => x
}

module.exports = λ t val -> to(type(t))(val);
