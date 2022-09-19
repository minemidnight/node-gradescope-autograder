#include "factorial.h"

#include <stdio.h>
#include <assert.h>

int main() {
	int res = factorial(5);
	
	printf("factorial(5) should be 120\n");
	assert(res == 120);

	return 0;
}
