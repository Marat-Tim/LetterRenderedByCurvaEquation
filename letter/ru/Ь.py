from common import *

expr = Eq(
    (x + S(1) / 2)
    * ((x + S(1) / 2) ** 2 + 4 * y ** 2 + 4 * y)
    * sqrt(
        (x + S(1) / 2 + eps) /
        (1 - Abs(y))
    )
    ,
    0
)
size = 1
