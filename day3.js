import { readFileSync } from 'fs';

// [['vJrwpWtwJgWr', 'hcsFMMfFFhFp'], ['etc', 'etc]]
const data = readFileSync('data/day3', 'utf-8')
    .trim()
    .split('\n')
    .map((rucksack) => [
        rucksack.slice(0, rucksack.length / 2),
        rucksack.slice(rucksack.length / 2),
    ]);

const go = (data) =>
    data.reduce((total, incoming) => {
        const intersection = incoming
            .map((rucksack) => rucksack.split(''))
            .reduce((a, b) => a.filter((c) => b.includes(c)))[0];
        return (
            total +
            (intersection === intersection?.toUpperCase()
                ? intersection.charCodeAt() - 38
                : intersection.charCodeAt() - 96)
        );
    }, 0);
const p1 = go(data);
console.log(p1);

// put every 3 items into an array, rejoin them
const data2 = data.reduce((acc, next, i) => {
    return i % 3 === 0
        ? [...acc, [next.join('')]]
        : [...acc.slice(0, -1), [...acc.slice(-1)[0], next.join('')]];
}, []);

const p2 = go(data2);
console.log(p2);
