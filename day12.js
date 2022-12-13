import { readFile } from './helpers.js';

const data = readFile(12)
    .split('\n')
    .map((r) => r.split(''));

const findOne = (key) => {
    const y = data.findIndex((row) => row.includes(key));
    return {
        key,
        y,
        x: data[y].findIndex((col) => col === key),
    };
};
const findMany = (key) =>
    data.reduce((acc, row, y) => {
        const x = row.findIndex((col) => col === key);
        return x > -1 ? [...acc, { key, x, y }] : acc;
    }, []);
const findNear = (x, y) =>
    [
        { key: data[y - 1]?.[x], x, y: y - 1 }, // N
        { key: data[y + 1]?.[x], x, y: y + 1 }, // S
        { key: data[y]?.[x - 1], x: x - 1, y }, // W
        { key: data[y]?.[x + 1], x: x + 1, y }, // E
    ].filter(({ key }) => key !== undefined);

const findPathDown = (from, to) => {
    const visited = new Set([`${from.x},${from.y}`]);
    const queue = [from];
    const distance = [];
    distance[`${from.x},${from.y}`] = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        const { key, x, y } = current;
        const char = key === 'E' ? 122 : key.charCodeAt();
        const near = findNear(x, y).filter(
            // limit to only the next char or any above
            ({ key }) =>
                key.charCodeAt() >= char - 1 || (key === 'S' && 97 >= char - 1)
        );
        near.forEach((n) => {
            const key = `${n.x},${n.y}`;
            if (visited.has(key)) return;
            visited.add(key);
            queue.push(n);
            distance[key] = distance[`${current.x},${current.y}`] + 1;
        });
    }
    const theTo = Array.isArray(to) ? to : [to];
    const toFind = theTo.map((i) => `${i.x},${i.y}`);
    const indexes = toFind.map((i) => Object.keys(distance).indexOf(i));
    const v = indexes.map((i) => distance[Object.keys(distance)[i]]);
    return Math.min(...v);
};

const part1 = findPathDown(findOne('E'), findOne('S'));
console.log(part1);

const part2 = findPathDown(findOne('E'), findMany('a'));
console.log(part2);
