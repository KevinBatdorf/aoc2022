import { readFileSync } from 'fs';

// [['2-4', '4-6'], ['2-4', '4-6'], etc]
const data = readFileSync('data/day4', 'utf-8')
    .trim()
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

const part2 = ranges.reduce(
    (total, next) =>
        next[0].some((v) => next[1].includes(v)) ? total + 1 : total,
    0
);
console.log(part2);
