import { readFile } from './helpers.js';

const data = readFile(10)
    .split('\n')
    .map((line) => line.split(' '));

const noop = (acc) => [...acc, acc.at(-1)];
const addx = (acc, [_, arg]) => [
    ...[...acc, acc.at(-1)],
    acc.at(-1) + Number(arg),
];
const ops = {
    noop, // return a copy of the prev value
    addx, // return a copy of the [prev value, prev value + arg]
};

const cycles = data
    .reduce((acc, [op, arg]) => ops[op](acc, [op, arg]), [1])
    .slice(0, -1);

const part1 = [20, 60, 100, 140, 180, 220]
    .map((i) => cycles[i - 1] * i)
    .reduce((a, b) => a + b);
console.log(part1);

// Part 2
cycles.forEach((op, i) => {
    const char = [op, op + 1, op + 2].includes((i % 40) + 1) ? 'X' : '.';
    process.stdout.write(char);
    if ((i + 1) % 40 === 0) process.stdout.write('\n');
});
