// solution 1
function isPrime(num) {
	for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
		if (num % i === 0) {
			return false;
		}
	}

	return true;
}

function listPrimesBeforeN(n) {
	for (let i = 2; i <= n; i++) {
		if (isPrime(i)) {
			console.log(i);
		}
	}
}

// Sieve of Eratosthenes

function listPrimesBeforeNOpt(n) {
    // initialize array with n values
    let primes = [];

    for (let i = 0; i <= n; i++) {
        primes.push(true);
    }

    // identify and mark all primes
    for (let i = 2; i * i <= n; i++) {
        // if marked as true, we assume that it is a prime number
        if (primes[i] === true) {
            for (let j = i * i; j <= n; j += i) {
                primes[j] = false;
            }
        }
    }

    // print all primes
    for (let i = 2; i < primes.length; i++) {
        if (primes[i] === true) {
            console.log(`Prime: ${i}`);
        }
    }
}

const ex1 = 20;
listPrimesBeforeNOpt(ex1);
