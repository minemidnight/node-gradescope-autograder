set -e

echo "5" | valgrind --leak-check=full \
         --show-leak-kinds=all \
         --track-origins=yes \
         --verbose \
		 --error-exitcode=1 \
		 ./factorial_main
