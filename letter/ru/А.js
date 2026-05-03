import { Letter } from '../../Letter.js';

const expr = '(y + 4*abs(x) - 1) * (y + 1/4) * sqrt((1 + 1/10 - y - 4*abs(x))/(1 - abs(y)))';

export const letter = new Letter(expr, 1);
