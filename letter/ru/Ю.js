import { Letter } from '../../Letter.js';

const expr = 'y * (x + 1/2) * (16*x^2 - 8*x + y^2) * sqrt(((x + 1/2 + 1/10) * (16*x^2 - 8*x + y^2 + 1/10)) / ((1 - abs(y)) * (1/2 + 1/10 - x)))';

export const letter = new Letter(expr, 1);
