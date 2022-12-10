import { readFile } from './helpers.js';

const data = readFile(6);

const findUniques = (length) => {
    const list = [];
    let count = 0;
    for (let next of data.split('')) {
        list.push(next);
        count++;
        // If we have less than the length we need to keep going
        if (list.length < length) continue;
        // If we have the length we need to check if we have a unique set
        if (new Set(list).size === length) break;
        list.shift();
    }
    return count;
};

// part 1
console.log(findUniques(4));
// part 2
console.log(findUniques(14));
