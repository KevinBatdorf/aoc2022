import { readFileSync } from 'fs';

const data = readFileSync('data/day8', 'utf-8')
    .trim()
    .split('\n')
    .map((line) => line.split('').map((num) => Number(num)));

const trees = data.reduce((grid, line, row, source) => {
    return [
        ...grid,
        line.reduce((acc, num, column) => {
            const tree = { num };

            // top
            const prevTop = source.slice(0, row).reverse();
            // nothing above
            if (!prevTop?.length) {
                tree.t = true;
                tree.vt = 0; // visible top
            }
            for (let j = 0; j < prevTop.length; j++) {
                const topItem = grid?.[row - 1 - j]?.[column];
                tree.t = false;
                // as soon as we encounter a value greater than ours, we can stop
                if (topItem?.num >= num) {
                    tree.vt = j + 1;
                    break;
                }
                // If we encounter a row that is visible, we can stop if we are greater
                if (topItem?.t) {
                    tree.t = topItem.num < num;
                    tree.vt = topItem.num < num ? prevTop.length : j;
                    break;
                }
            }

            // left
            // nothing to the left
            if (!acc?.[column - 1]) {
                tree.l = true;
                tree.vl = 0; // visible left
            }
            for (let j = 0; j < column; j++) {
                const leftItem = acc?.[column - 1 - j];
                tree.l = false;
                // as soon as we encounter a value greater than ours, we can stop
                if (leftItem.num >= num) {
                    tree.vl = j + 1;
                    break;
                }
                // If we encounter a row that is visible, we can stop if we are greater
                if (leftItem.l) {
                    tree.l = leftItem.num < num;
                    tree.vl = leftItem.num < num ? column : j;
                    break;
                }
            }

            // Right
            // Look ahead to the right until we encounter a value greater than ours
            let c = column;
            do {
                const next = source[row][c + 1];
                tree.r = next !== undefined ? num > next : undefined;
                c++;
            } while (tree.r && tree.r !== undefined);
            tree.vr = c - column - (tree.r === undefined ? 1 : 0);
            if (tree.r === undefined) tree.r = true;

            // Bottom
            // Look ahead to the bottom until we encounter a value greater than ours
            let r = row;
            do {
                const next = source[r + 1]?.[column];
                tree.b = next !== undefined ? num > next : undefined;
                r++;
            } while (tree.b && tree.b !== undefined);
            tree.vb = r - row - (tree.b === undefined ? 1 : 0);
            if (tree.b === undefined) tree.b = true;

            return [...acc, tree];
        }, []),
    ];
}, []);

// filter out where all are false
const part1 = trees
    .reduce((acc, row) => {
        return [
            ...acc,
            row.filter((item) => item.l || item.t || item.r || item.b),
        ];
    })
    .flat().length;
console.log(part1);

// multiply and find the max
const part2 = trees
    .reduce(
        (acc, row) => [
            ...acc,
            row.map((item) => item.vt * item.vl * item.vr * item.vb),
        ],
        []
    )
    .flat()
    .reduce((acc, num) => (num > acc ? num : acc), 0);
console.log(part2);
