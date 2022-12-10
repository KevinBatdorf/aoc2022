import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readFile = (day) =>
    readFileSync(resolve(__dirname, `./data/day${day}`), 'utf-8').trim();
