#include <stdio.h>
#include <assert.h>

int main() {
	int res = factorial(5);

	printf("factorial(5) should be 120\n");
	if(res != 120) {
		fprintf(stderr, "%d != %d\n", res, 120);

		return 1;
	}

	return 0;
}
