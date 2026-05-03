import { Letter } from '../../Letter.js';

const expr = '(x + 1/2) * (1/4*(x + 1/2)^2 + (y - 1/2)^2 - 1/4) * sqrt(x + 1/2 + 1/10) / sqrt(1 + 1/10 - abs(y))';

export const letter = new Letter(expr, 1);
