import { Letter } from '../../Letter.js';

const expr = '(x + 1/2) * (y - 1) / sqrt(1 + 1/10 - abs(y - 2*x - 1))';

export const letter = new Letter(expr, 1);
