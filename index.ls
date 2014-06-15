module.exports = :cajole (format, value)--> switch typeof! format
	| \Function => format value
	| \Object   => {[k, cajole f, value[k]] for k,f of format}
