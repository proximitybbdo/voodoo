TESTS = test/*.js

.PHONY: test clean build

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--require should \
	--reporter landing \
	$(TESTS)

clean:
	rm -f examples/tmp/*

build:
	@coffee -c -o ./lib ./src
	@coffee -c -o ./lib ./src/needles/
	@coffee -c ./test

