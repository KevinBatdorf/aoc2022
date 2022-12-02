import { readFileSync } from 'fs';

// [['A', 'X'], ['C', 'Z']]
const data = readFileSync('data/day2', 'utf-8')
    .trim()
    .split('\n')
    .map((elf) => elf.split(' '));

const shapes = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
    X: 1, // Rock
    Y: 2, // Paper
    Z: 3, // Scissors
};

const winner = (them, me) => {
    // Draw
    if (them === 'A' && me === 'X') return 3;
    if (them === 'B' && me === 'Y') return 3;
    if (them === 'C' && me === 'Z') return 3;
    // I win
    if (them === 'A' && me === 'Y') return 6;
    if (them === 'B' && me === 'Z') return 6;
    if (them === 'C' && me === 'X') return 6;
    // I lose
    return 0;
};

const getScore = (data) => data.reduce(
    (acc, [them, me]) => acc + shapes[me] + winner(them, me),
0)

// Part 2 changes:
// X = lose
// Y = draw
// Z = win
const iNeedToWin = (them) => {
    if (them === 'A') return 'Y';
    if (them === 'B') return 'Z';
    return 'X';
};
const iNeedToLose = (them) => {
    if (them === 'A') return 'Z';
    if (them === 'B') return 'X';
    return 'Y';
};

// Swap instruction value (w/d/l) with shape (r/p/s)
const transform = ([them, me]) => {
    if (me === 'Y') return [
        them,
        // A, B, C + 23 = X, Y, Z
        String.fromCharCode(them.charCodeAt() + 23)
    ] // Draw
    if (me === 'X') return [them, iNeedToLose(them)]
    return [them, iNeedToWin(them)]
}

const day1 = getScore(data)
const day2 = getScore(data.map(transform))

console.log(day1)
console.log(day2)
