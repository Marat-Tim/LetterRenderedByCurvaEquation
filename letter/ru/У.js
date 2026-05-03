import { Letter } from '../../Letter.js';

const expr = '(abs(y) - 2*abs(x)) * sqrt(y - 2*x + 1/10) / sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
