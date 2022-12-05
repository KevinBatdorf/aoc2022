import { readFileSync } from 'fs';

const [top, bottom] = readFileSync('data/day5', 'utf-8').split('\n\n');
const state = top.split('\n').slice(0, -1);
const instructions = bottom.split('\n');
const length = top.split('\n').slice(-1)[0].split(' ').at(-1);

// Note: intentionally took an imperative approach
const go = (transform) => {
    //  { 1: [], 2: [], 3: [] }
    const stack = Array.from({ length }).reduce(
        (acc, _, i) => ({ ...acc, [i + 1]: [] }),
        {}
    );
    state.forEach((items, i) => {
        Array.from({ length }).forEach((_, index) => {
            // cut every 3rd set
            const start = index * 3 + index;
            // [N] [F] [Z] -> [N] -> N
            const value = items
                .slice(start, start + 3)
                .trim()
                .replace(/\[|\]/g, '');
            // 1 indexed to make the instructions easier to read in later
            value && stack[index + 1].unshift(value);
        });
    });
    instructions.forEach((instruction) => {
        if (!instruction) return;
        // [_1move, 5, _2from, 2, _3to, 6]
        const [_1, count, _2, from, _3, to] = instruction.split(' ');
        // Get what is moving
        const moving = Array.from({ length: count }).map((i) =>
            stack[from].pop()
        );
        // In part 2 we need to reverse the order of the moving items
        // so i updated this to accept a transform cb function
        stack[to].push(...transform(moving));
    });
    // format for the input
    return Object.values(stack)
        .map((s) => s.at(-1))
        .join('');
};

const part1 = go((data) => data);
console.log(part1);

const part2 = go((data) => data.reverse());
console.log(part2);
