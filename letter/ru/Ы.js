import { Letter } from '../../Letter.js';

const expr = '(abs(x) - 1/2) * (4*(x + 1/2)^2 + 4*y^2 + 4*y) * sqrt((1/2 + 1/10 - abs(x)) / (1 - abs(y)))';

export const letter = new Letter(expr, 1);
