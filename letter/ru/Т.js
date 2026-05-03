import { Letter } from '../../Letter.js';

const expr = 'x * (y - 1) * sqrt(1 + 1/10 - y) / sqrt((1/2 - abs(x)) * (y + 1))';

export const letter = new Letter(expr, 1);
