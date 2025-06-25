from common import *

expr = Eq(
    div(
        (x + S(1) / 2)
        * (S(1) / 4 * (x + S(1) / 2) ** 2 + (y - S(1) / 2) ** 2 - S(1) / 4)
        * sqrt(x + S(1) / 2 + eps),
        sqrt(1 + eps - Abs(y))
    )
    ,
    0
)
size = 1
