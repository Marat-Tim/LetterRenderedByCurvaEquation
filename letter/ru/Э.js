import { Letter } from '../../Letter.js';

const expr = '(9/4*(x + 1/6)^2 + y^2 - 1) * (y - 1/10) / sqrt(1/2 - abs(x))';

export const letter = new Letter(expr, 1);
