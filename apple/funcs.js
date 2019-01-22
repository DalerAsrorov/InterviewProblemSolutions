// Write a function that determines if given
// number is a mirror number

// array approach
function isMirror(num) {
    let charArray = String(num).split('');
    let isMirror = true;
    const n = charArray.length;

    for (let i = 0, j = n - 1; i < parseInt(n / 2); ++i, --j) {
        if (charArray[i] !== charArray[j]) {
            isMirror = false;
            break;
        }
    }

    return isMirror;
}