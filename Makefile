export SHELL := /bin/bash
export PATH  := $(shell npm bin):$(PATH)

SWEET_OPTS = -m sparkler/macros -m lambda-chop/macros -r

all: index.js

%.js: %.sjs
	sjs $(SWEET_OPTS) --output $@ $<

test: index.js test.js
	mocha -u exports test.js

.PHONY: test
