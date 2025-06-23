from common import *

expr = Eq(
    div(
        (Abs(x) - S(1) / 2) * (y - 2 * x),
        sqrt(1 - Abs(y))
    )
    ,
    0
)
size = 1
