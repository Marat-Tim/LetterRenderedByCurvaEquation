import { Letter } from '../../Letter.js';

const expr = '(x + 1/2) * (abs(y) - x - 1/2) / sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
