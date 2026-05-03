import { Letter } from '../../Letter.js';

const expr = '(2*abs(x) - y) * (abs(x) - 1/2) / sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
