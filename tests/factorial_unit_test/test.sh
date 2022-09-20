set -e

gcc $TEST_DIR/test.c -o test -include factorial.c factorial.h

test
