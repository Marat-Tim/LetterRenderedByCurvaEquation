import { Letter } from '../../Letter.js';

const expr = '(abs(x) - 1/2) * (y - 1/10) * sqrt(1/2 + 1/10 - abs(x)) / sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
