import { Letter } from '../../Letter.js';

const micro_eps = 0.01;
const expr = `(abs(x - y - 1 - ${micro_eps}) + abs(x + y + 1 + ${micro_eps}) - 1) * (abs(2*x - 2/3*y + 1/6) + abs(2*x + 2/3*y - 1/6) - 1) / sqrt(y + 1)`;

export const letter = new Letter(expr, 1);
