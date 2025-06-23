from common import *

expr = Eq(
    div(
        (2 * Abs(x) - y) * (Abs(x) - S(1) / 2),
        sqrt(1 - Abs(y))
    )
    ,
    0
)
size = 1
