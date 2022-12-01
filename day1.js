import { readFileSync } from 'fs';

// [[1, 2, 3], [4, 5, 6]]
const data = readFileSync('data/day1', 'utf-8')
    .split('\n\n')
    .map((elf) => elf.split('\n').map(Number));

const cals = data.reduce((prev, next) => {
    // Add them up
    const total = next.reduce((a, b) => a + b, 0);
    // Only keep the largest
    return total > prev ? total : prev;
}, 0);
console.log(cals);

const cals2 = data
    .map((c) => c.reduce((a, b) => a + b, 0)) // Add insides
    .sort((a, b) => b - a) // Sort descending
    .slice(0, 3) // Only keep the first 3
    .reduce((a, b) => a + b, 0); // Add each of the 3 together
console.log(cals2);
