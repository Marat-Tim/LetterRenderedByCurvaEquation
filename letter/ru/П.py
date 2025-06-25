from common import *

expr = Eq(
    div(
        Abs(x + S(1) / 2 * y) + Abs(x - S(1) / 2 * y) - 1,
        sqrt(y + Abs(x) + S(1) / 2)
    )
    ,
    0
)
size = 1
