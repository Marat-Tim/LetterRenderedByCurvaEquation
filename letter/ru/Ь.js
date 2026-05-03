import { Letter } from '../../Letter.js';

const expr = '(x + 1/2) * ((x + 1/2)^2 + 4*y^2 + 4*y) * sqrt((x + 1/2 + 1/10) / (1 - abs(y)))';

export const letter = new Letter(expr, 1);
