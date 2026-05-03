import { Letter } from '../../Letter.js';

const expr = 'x * (x^2 + (y - 1/2)^2 - 1/4) / sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
