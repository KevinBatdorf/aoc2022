import { readFile } from './helpers.js';

const data = readFile(12)
    .split('\n')
    .map((r) => r.split(''));

// find start position
const startY = data.findIndex((row) => row.includes('S'));
const startX = data[startY].findIndex((col) => col === 'S');

const findNear = (x, y, visited) => {
    return [
        { key: data[y - 1]?.[x], x, y: y - 1 }, // N
        { key: data[y + 1]?.[x], x, y: y + 1 }, // S
        { key: data[y]?.[x - 1], x: x - 1, y }, // W
        { key: data[y]?.[x + 1], x: x + 1, y }, // E
    ]
        .filter(({ key }) => key !== undefined)
        .filter(({ x, y }) => !visited.includes(`${x}:${y}`)) // remove visited
        .sort((a, b) => b.key.localeCompare(a.key)); // prefer lower char
};

const findPathToExit = (x, y, visited = [], ignore = []) => {
    const char = data[y][x] === 'S' ? 96 : data[y][x].charCodeAt();
    const near = findNear(x, y, [...visited, ...ignore]);

    // if we are near the E, see if we are one elevation below or equal
    if (near.find(({ key }) => key === 'E') && [char, char + 1].includes(122)) {
        return [...visited, `${x}:${y}`];
    }

    // if no options we need to backtrack to a safe spot
    if (near.length === 0) {
        // find a visited spot that has multiple near values available
        const backtrack = visited
            .map((v) => v.split(':').map(Number))
            .reverse()
            // Backtrack until we can find a spot with multiple options
            .find((v) => findNear(...v, visited).length > 0);

        const badIndex = visited.indexOf(`${backtrack[0]}:${backtrack[1]}`);
        const newVisited = visited.slice(0, badIndex + 1);

        // This doesn't wok. My guess is I'm not backtracking properly, or ignoring bad spots properly

        return findPathToExit(...backtrack, newVisited, [
            ...ignore,
            visited.slice(badIndex + 1),
        ]);
    }

    const dir =
        near.find(({ key }) => [char, char + 1].includes(key.charCodeAt())) ||
        near[0];

    return findPathToExit(
        dir.x,
        dir.y,
        [...visited, `${dir.x}:${dir.y}`],
        ignore
    );
};
const part1 = findPathToExit(startX, startY).length;
console.log(part1);
