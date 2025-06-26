from common import *

expr = Eq(
    (Abs(x) - S(1) / 2)
    * (4 * (x + S(1) / 2) ** 2 + 4 * y ** 2 + 4 * y)
    * sqrt(
        (S(1) / 2 + eps - Abs(x)) /
        (1 - Abs(y))
    )
    ,
    0
)
size = 1
