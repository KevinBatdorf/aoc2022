import { readFile } from './helpers.js';

// [['vJrwpWtwJgWr', 'hcsFMMfFFhFp'], ['etc', 'etc']]
const data = readFile(3)
    .split('\n')
    .map((rucksack) => [
        rucksack.slice(0, rucksack.length / 2),
        rucksack.slice(rucksack.length / 2),
    ]);

const go = (data) =>
    data.reduce((total, incoming) => {
        // Accept unlimited length of arrays to check intersection
        const intersection = incoming
            .map((rucksack) => rucksack.split(''))
            .reduce((a, b) => a.filter((c) => b.includes(c)))[0];
        return (
            total +
            // Compute the value based on char code
            (intersection === intersection?.toUpperCase()
                ? intersection.charCodeAt() - 38
                : intersection.charCodeAt() - 96)
        );
    }, 0);

// put every 3 items into an array, rejoin them
// [['vJrwpWtwJgWrhcsFMMfFFhFp', 'another', 'another'], ['etc', 'etc', 'etc]]
const data2 = data.reduce((acc, next, i) => {
    return i % 3 === 0
        ? [...acc, [next.join('')]]
        : [...acc.slice(0, -1), [...acc.slice(-1)[0], next.join('')]];
}, []);

const p1 = go(data);
console.log(p1);

const p2 = go(data2);
console.log(p2);
