function findMinValue(arr) {
    let min = Infinity;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < min) {
			min = arr[i];
        }
    }
    return min;
}


let result = findMinValue([1, 4, 3, 12, 5, 7, 3]);

console.log({result});

