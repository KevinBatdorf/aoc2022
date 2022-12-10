import { readFile } from './helpers.js';

const data = readFile(7).split('\n');

// Build file tree
const fileTree = data.reduce(
    (dir, line) => {
        const details = line.split(' ');

        // Not needed
        if (details.includes('ls')) return dir;

        if (details.includes('dir')) {
            dir.children = [
                ...(dir?.children ?? []),
                {
                    name: details.at(-1),
                    children: [],
                    parent: dir,
                    size: 0,
                    totalSize: 0,
                },
            ];
            return dir;
        }

        if (details.includes('cd')) {
            if (details.at(-1) === '/') return dir;
            if (details.at(-1) === '..') {
                return dir.parent;
            }
            return dir.children.find((child) => child.name === details.at(-1));
        }

        // Must be a file
        const size = Number(details[0]);
        dir.size += size;
        dir.totalSize += size;

        // Walk up every parent and add size to totalSize
        let parent = dir.parent;
        while (parent) {
            parent.totalSize += size;
            parent = parent.parent;
        }
        return dir;
    },
    {
        name: '/',
        children: [],
        parent: null,
        size: 0,
        totalSize: 0,
    }
);

// Walk up to the outer most parent
let parent = fileTree.parent;
do {
    parent = parent.parent || parent;
} while (parent?.parent);

// Exclude less than 100k
const sumIt = (node) =>
    (node.totalSize > 100_000 ? 0 : node.totalSize) +
    node.children.reduce((sum, child) => sum + sumIt(child), 0);
const part1 = sumIt(parent);
console.log(part1);

// Part 2
const totalSpace = 70_000_000;
const spaceNeeded = 30_000_000 - (totalSpace - parent.totalSize);

// Find all directories where total size is greater than space needed
const findDirs = (node) => {
    if (node.totalSize > spaceNeeded) {
        return [node, ...node.children.flatMap(findDirs)];
    }
    return node.children.flatMap(findDirs);
};
// Get smallest of this set
const part2 = findDirs(parent)
    .sort((a, b) => a.totalSize - b.totalSize)
    .at(0).totalSize;
console.log(part2);
