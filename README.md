# gradescope autograder in node.js

Autograder for Gradescope written in Node.js

## Configuration files:

`./config.yml`

Basic configuration file for the autograder. Valid options:
option | description | required
--- | --- | ---
tests_directory | where the folder containing tests is stored | yes
submission_limit | max number of submissions (not yet implemented) | no
required_files | files required in the submission before running the grader | yes (can be empty array)

___

## Testing Folders

Under the test directory defined in the config file, the autograder will automatically scan for other folders within that folder.
Each one of these folders should contain a test.

Each test requires a minimum of 2 files in it's directory:
- `test.sh`
- `test.yml`

___

### `test.sh`

This is the script that will run the test. It should have a zero exit code for successful tests, and non-zero for failing tests.

Additional Environment Variables provided when `test.sh` is ran:
- `SUBMISSION_DIR` - the directory where the submission is located (this will also be the cwd of the script)
- `TEST_DIR` - the directory where this script is actually located (if you need to clone files, for example) 

___

### `test.yml`

The configuration file to describe the test.

option | description | required
--- | --- | ---
name | name of test case to display in gradescope | yes 
visibility | gradescope test visibility [view info here](https://gradescope-autograders.readthedocs.io/en/latest/specs/) | no
type | type of test (bootstrap, unit, io, script) | yes
timeout | number of seconds for test script to run before timing out | no, defaults to 30
max_score | max score for this test | yes for non-bootstrap tests

Test type descriptions:
- bootstrap - This test should be defined at most one time. This test will have to pass in order to continue running all other tests. If it does not pass, the student will get a 0 for the entire submission. Code should be compiled here, if applicable
- io - Run a file piping something to the standard input. Compare the standard output vs an expected output.
- unit - Basically the same as `script`, meant for unit tests
- script - Run a script and give point based on exit code

Test-specific configuration options

___

### io

IO Tests require two additional files in their test directory:
- `expected.txt` - expected output
- `in.text` - input to pipe to stdin (file can be empty, but it must exist)

Extra `test.yml` options for IO tests:

option | description | required
--- | --- | ---
io_check | how to check io output (flexible or strict) | yes 
display_diff | when student fails io check, should they see the difference between their output and expected output? | no (defaults to true)

io_check types:
- flexible - checks if both expected output and actual output has same lines in order, but each line can have differing whitespace at start and end of the line
- strict - outputs must be exactly the same (allows trailing whitespace only)

___

Examples

See the [tests](/tests/) directory to see example tests with compilation bootstrap test, io test, unit test,
and a custom valgrind scipt test.
