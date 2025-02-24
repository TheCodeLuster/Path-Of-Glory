/*

void a () {
	var_in_the_stack 
	// return last pushed value 
}

void b () {
	nonlocal var_not_in_the_stack // some grabage
}

int main (void) {
	a();

	b();
}


// UI for console
class UI () {
	...
		...
}


// main () implementation
void _start() {
    // Initialize the runtime
    init_runtime();

    // Call main and store its return value
    int result = main();

    // Perform any necessary cleanup
    cleanup_runtime();

    // Exit the program with the return code from main
    exit(result);
}

// calling main initially
int main (int argc, char *argv[], char *envp[]) {
	uint_16 static;
	
	UI();

	return 0;
}

// I will not dive into vectors :(
string arr = ["true", "false"];

bool flag = random.choice(arr);

*size_t func_name(*parametrs) {
	//scope (local) body
		// implementation of code (optionally)	
	return flag
}
void *allocate_heap_memory(size_t size) {
    void *ptr = malloc(size);
    if (ptr == NULL) {
        exit(EXIT_FAILURE);
    }
    return ptr;
}

void simulated_gc(void) {
    // Placeholder for a garbage collector routine 
}

void _start(void) {
    // Runtime initialization would occur here 
    int exit_code = main(0, NULL);
    simulated_gc();
    exit(exit_code);
} 

*/
