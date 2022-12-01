import { readFileSync } from 'fs';

const data = readFileSync('data/day1', 'utf-8');

const cals = data.split('\n\n').reduce((acc, cur) => {
    const total = cur.split('\n').reduce((a, b) => Number(a) + Number(b), 0);
    return total > acc ? total : acc;
}, 0);
console.log(cals);

const cals2 = data
    .split('\n\n')
    .sort((a, b) => {
        const current = a
            .split('\n')
            .reduce((a, b) => Number(a) + Number(b), 0);
        const next = b.split('\n').reduce((a, b) => Number(a) + Number(b), 0);
        return next - current;
    })
    .slice(0, 3)
    .map((c) => c.split('\n').reduce((a, b) => Number(a) + Number(b), 0))
    .reduce((a, b) => a + b, 0);
console.log(cals2);
