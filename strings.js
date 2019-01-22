let str = 'A great way to learn is to practice.';
const n = str.length;

function reverseStr(str) {
    let reversed = '';

    for (let i = n - 1; i >= 0; --i) {
        reversed += str[i];
    }

    return reversed;
}

console.log(reverseStr(str));




