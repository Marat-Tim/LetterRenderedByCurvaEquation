import { Letter } from '../../Letter.js';

const expr = '(abs(x) - 1/2) * (y - 2*x) * (x^2 + (y - 17/8)^2 - 1) / sqrt(3/2 - abs(y) - abs(x))';

export const letter = new Letter(expr, 1);
