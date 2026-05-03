import { Letter } from '../../Letter.js';

const expr = '(abs(y) - 2*abs(x)) * x / sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
