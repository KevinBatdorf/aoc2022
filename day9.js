import { readFileSync } from 'fs';
const data = readFileSync('data/day9', 'utf-8').trim().split('\n');
const whichWay = {
    U: [0, 1],
    D: [0, -1],
    L: [-1, 0],
    R: [1, 0],
};
const addIt = (a, b) => [a[0] + b[0], a[1] + b[1]];
const moves = data
    .map((s) => s.split(' '))
    .flatMap((move) => {
        const [direction, length] = move;
        return Array.from({ length }, () => whichWay[direction]);
    });
const path = moves.reduce((h, move) => [...h, addIt(h.at(-1), move)], [[0, 0]]);

const getRoute = (history, move) => {
    const [nextX, nextY] = move;
    const [lastX, lastY] = history.at(-1);

    // If we already are near, don't move
    if (Math.abs(nextX - lastX) <= 1 && Math.abs(nextY - lastY) <= 1)
        return history;

    // move x or y
    const x = nextX === lastX ? 0 : nextX > lastX ? 1 : -1;
    const y = nextY === lastY ? 0 : nextY > lastY ? 1 : -1;

    // Track history
    return [...history, [lastX + x, lastY + y]];
};

const go = (length) =>
    Array.from({ length }).reduce(
        (lastPath) => lastPath.reduce(getRoute, [[0, 0]]),
        path
    );

const part1 = new Set(go(1).map((p) => p.join(':')));
console.log(part1.size);

const part2 = new Set(go(9).map((p) => p.join(':')));
console.log(part2.size);
