let nested = [1, 2, [2, 3], [4, 5], [{}, [6, [7]]]];

function flattenArray(array) {
    let flattened = [];

    while(array.length > 0) {
        let elem = array.shift();

        if (Array.isArray(elem)) {
            array = [...elem, ...array];
        } else {
            flattened.push(elem);
        }
    }

    return flattened;
}

console.log(flattenArray(nested));