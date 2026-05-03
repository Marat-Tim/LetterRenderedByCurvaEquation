import { Letter } from '../../Letter.js';

const expr = '(abs(x + 1/2*y) + abs(x - 1/2*y) - 1) / sqrt(y + abs(x) + 1/2)';

export const letter = new Letter(expr, 1);
