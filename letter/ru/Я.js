import { Letter } from '../../Letter.js';

const expr = '(x - 1/2) * (y - x + 1/2) * ((x - 1/2)^2 + 4*y^2 - 4*y) * sqrt(1/2 + 1/10 - x) * sqrt(1 - abs(y))';

export const letter = new Letter(expr, 1);
