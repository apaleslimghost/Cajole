export SHELL := /bin/bash
export PATH  := $(shell npm bin):$(PATH)

SWEET_OPTS = -m sparkler/macros

all: index.js

%.js: %.sjs
	sjs $(SWEET_OPTS) --output $@ $<

test: index.js
	mocha -u exports test.js

.PHONY: test
