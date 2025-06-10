from common import *

expr = Eq(
    (x + S(1) / 2) *
    (y - 1) *
    ((x + S(1) / 2) ** 2 + (2 * y + 1) ** 2 - 1) *
    sqrt(
        S((x + S(1) / 2 + eps) * (y - (1 + eps))) /
        ((x - (S(1) / 2 + eps)) * (y + 1 + eps))
    ),
    0
)
size = 1
