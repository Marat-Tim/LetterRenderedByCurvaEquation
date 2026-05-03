import { Letter } from '../../Letter.js';

const expr = '(x^2 + (abs(y) - 1/2)^2 - 1/4) / sqrt(x + abs(y))';

export const letter = new Letter(expr, 1);
