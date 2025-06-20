from common import *

expr = Eq(
    div(
        (x + S(1) / 2)
        * (y - 1),
        sqrt(1 + eps - Abs(y - 2 * x - 1))
    )
    ,
    0
)
size = 1
