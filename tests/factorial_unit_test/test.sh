set -e

gcc $TEST_DIR/test.c -o $TEST_DIR/test -include factorial.c factorial.h

$TEST_DIR/test
