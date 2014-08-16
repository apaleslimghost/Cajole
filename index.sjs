function to {
	"string" => function toString {
		x @ String => x,
		x @ Array  => JSON.stringify(x),
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
	},
	[...xs] => function toArray(vs) {
		return xs.map(λ(x, i) -> module.exports(x)(vs[i]));
	},
	x @ Object => function toObject(obj) {
		var out = {};
		for(var p in x) {
			out[p] = module.exports(x[p])(obj[p]);
		}
		return out;
	}
};

function type {
	x @ {name} => x.name.toLowerCase(),
	x => x
}

module.exports = λ t val -> to(type(t))(val);
