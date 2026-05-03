import { Letter } from '../../Letter.js';

const expr = '(abs(y) - 1) * y * (x + 1/2) * sqrt((x + 1/2 + 1/10) * (1 + 1/10 - abs(y))) / sqrt(1/2 - x)';

export const letter = new Letter(expr, 1);
