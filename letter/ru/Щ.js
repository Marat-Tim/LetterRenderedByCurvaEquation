import { Letter } from '../../Letter.js';

const expr = '(abs(x + y/2) + abs(x - y/2) - 1) * (abs(x + y + 1/2) + abs(x - y - 7/4) - 1/4) * sqrt(x + y + 1/4 + 1/10 + abs(x - y - 7/4)) * sqrt(x + 1/2 + 1/10) * sqrt(y + 5/4) * x / sqrt(1 - y)';

export const letter = new Letter(expr, 1);
