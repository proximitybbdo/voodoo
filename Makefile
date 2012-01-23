TESTS = test/*.js

.PHONY: test-landing test-spec test-dot clean build

test-all: test-landing test-spec test-dot

test: test-spec

test-landing:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--require should \
	--reporter landing \
	$(TESTS)

test-spec:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--require should \
	--reporter spec \
	$(TESTS)

test-dot:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--require should \
	--reporter dot \
	$(TESTS)

clean:
	rm -f examples/tmp/*

build:
	@coffee -c -o ./lib ./src
	@coffee -c -o ./lib ./src/needles/
	@coffee -c ./test

