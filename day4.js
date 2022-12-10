import { readFile } from './helpers.js';

// [['2-4', '4-6'], ['2-4', '4-6'], etc]
const data = readFile(4)
    .split('\n')
    .map((plan) => plan.split(','));

// Create range from two numbers
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
};

// Create array of all numbers in range
const ranges = data.map((plan) =>
    plan.map((n) => range(...n.split('-').map(Number)))
);

const part1 = ranges.reduce((total, next) => {
    // Figure out which is the longer array
    const [a, b] = next.sort((a, b) => b.length - a.length);
    // Then check if the shorter array is fully included in the longer array
    return b.every((n) => a.includes(n)) ? total + 1 : total;
}, 0);
console.log(part1);

// Check if two arrays have any common elements at all
const part2 = ranges.reduce(
    (total, [plan1, plan2]) =>
        plan1.some((v) => plan2.includes(v)) ? total + 1 : total,
    0
);
console.log(part2);
