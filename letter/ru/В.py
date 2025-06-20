from common import *

expr = Eq(
    (x + S(1) / 2)
    * ((x + S(1) / 2) ** 2 + (2 * Abs(y) - 1) ** 2 - 1)
    * sqrt(
        S(x + S(1) / 2 + eps) /
        ((Abs(y) - 1 - eps) * (x - S(1) / 2 - eps))
    )
    ,
    0
)
size = 1
