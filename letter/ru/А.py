from common import *

expr = Eq(
    (y + 4 * Abs(x) - 1) *
    (y + S(1) / 4) *
    sqrt(S(1 + eps - y - 4 * Abs(x)) / (1 - Abs(y))),
    0)
size = 1
