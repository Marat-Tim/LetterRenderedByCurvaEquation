import { Letter } from '../../Letter.js';

const expr = '(x + 1/2) * ((x + 1/2)^2 + (2*abs(y) - 1)^2 - 1) * sqrt((x + 1/2 + 1/10)/((abs(y) - 1 - 1/10) * (x - 1/2 - 1/10)))';

export const letter = new Letter(expr, 1);
