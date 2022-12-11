import { readFile } from './helpers.js';

const buildMonkey = (acc, [name, items, op, test, ifTrue, ifFalse], i) => [
    ...acc,
    {
        name,
        items: items.split('items: ')[1].split(', ').map(Number),
        activeCount: 0,
        testValue: Number(test.split(' ').at(-1)),
        op: (item) =>
            new Function(
                'return ' + op.split('new = ')[1].replaceAll('old', item)
            )(),
        test: (item, list) => {
            const update = (other) => {
                list[other].items = [...list[other].items, item];
                return list;
            };
            return item % list[i].testValue === 0
                ? () => update(Number(ifTrue.split(' ').at(-1)))
                : () => update(Number(ifFalse.split(' ').at(-1)));
        },
    },
];

const doMonkeys = () =>
    readFile(11)
        .split('\n\n')
        .map((line) => line.split('\n'))
        .reduce(buildMonkey, []);

const doRounds = (monkeys, length, opts) => {
    const primesFactor = monkeys.reduce(
        (acc, { testValue }) => acc * testValue,
        1
    );
    return Array.from({ length }, (_, i) => i)
        .reduce(
            (monkeys) =>
                monkeys.reduce(
                    (monkeys, { items, op, test }, i) =>
                        items.reduce((list, item) => {
                            list[i].items = list[i].items.filter(
                                (i) => i !== item
                            );
                            list[i].activeCount++;
                            const newItem = opts.chill
                                ? Math.floor((op(item) % primesFactor) / 3)
                                : op(item) % primesFactor;
                            return test(newItem, list)();
                        }, monkeys),
                    monkeys
                ),
            monkeys
        )
        .sort((a, b) => b.activeCount - a.activeCount)
        .slice(0, 2)
        .reduce((a, b) => a.activeCount * b.activeCount);
};

const part1 = doRounds(doMonkeys(), 20, { chill: true });
console.log(part1);

const part2 = doRounds(doMonkeys(), 10000, { chill: false });
console.log(part2);
