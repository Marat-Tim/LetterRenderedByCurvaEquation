import { Letter } from '../../Letter.js';

const expr = '(abs(x) - 1/2) * (y - 2*x) / sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
