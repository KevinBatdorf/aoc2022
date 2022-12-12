import { readFile } from './helpers.js';

const data = readFile(12)
    .split('\n')
    .map((r) => r.split(''));

const findNear = (x, y, visited) => {
    return [
        { key: data[y - 1]?.[x], x, y: y - 1 }, // N
        { key: data[y + 1]?.[x], x, y: y + 1 }, // S
        { key: data[y]?.[x - 1], x: x - 1, y }, // W
        { key: data[y]?.[x + 1], x: x + 1, y }, // E
    ]
        .filter(({ key }) => key !== undefined)
        .filter(({ x, y }) => !visited.includes(`${x}:${y}`)) // remove visited
        .sort((a, b) => a.key.localeCompare(b.key)); // prefer higher char
};

const findPathFromExit = (dir, visited = []) => {
    const { x, y } = dir;
    const char = data[y][x] === 'E' ? 69 : data[y][x].charCodeAt();
    const near = findNear(x, y, visited).filter(
        ({ key }) => key.charCodeAt() >= char - 1
    );

    // todo: what to do if no near?

    // if we are near the start (S), see if we are one elevation above or equal
    if (near.find(({ key }) => key === 'S') && [char, char - 1].includes(97)) {
        return [...visited, `${x}:${y}`];
    }

    return findPathFromExit({ x: dir?.x, y: dir?.y }, [
        ...visited,
        `${dir.x}:${dir.y}`,
    ]);
};

const y = data.findIndex((row) => row.includes('E'));
const x = data[y].findIndex((col) => col === 'E');
const part1 = findPathFromExit({ x, y }).length;
console.log(part1);
