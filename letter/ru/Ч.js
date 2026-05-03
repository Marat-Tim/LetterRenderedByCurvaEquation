import { Letter } from '../../Letter.js';

const expr = '(abs(x) - 1/2) * y / sqrt((x + y + 1/2) * (1/2 + 1/10 - x) * (1 - y))';

export const letter = new Letter(expr, 1);
