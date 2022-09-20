#include <stdio.h>
#include <assert.h>

int main() {
	int res = factorial(5);

	printf("factorial(5) should be 125\n");
	if(res != 125) {
		fprintf(stderr, "%d != %d\n", res, 125);

		return 1;
	}

	return 0;
}
