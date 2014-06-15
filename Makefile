all: index.js

%.js: %.ls
	node_modules/.bin/lsc -c $<

test: index.js
	node_modules/.bin/mocha -r LiveScript -u exports test.ls

.PHONY: test
