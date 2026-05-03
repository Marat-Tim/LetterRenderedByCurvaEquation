import { Letter } from '../../Letter.js';

const expr = '(x + 1/2) * (1/4*(x + 1/2)^2 + y^2 + y) * (y - 1) * sqrt(x + y - 1/2 + 1/10 + abs(x + 3/2 - y)) / sqrt((1/2 - x - y) * (y + 8*x + 5))';

export const letter = new Letter(expr, 1);
