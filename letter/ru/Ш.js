import { Letter } from '../../Letter.js';

const expr = 'x * (abs(x) - 1/2) * (y + 1) * sqrt((1/2 + 1/10 - abs(x)) * (1 - y) / (y + 1 + 1/10))';

export const letter = new Letter(expr, 1);
