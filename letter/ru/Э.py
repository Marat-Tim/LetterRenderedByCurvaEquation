from common import *

expr = Eq(
    div(
        (S(9) / 4 * (x + S(1) / 6) ** 2 + y ** 2 - 1) * (y - eps),
        sqrt(S(1) / 2 - Abs(x))
    )
    ,
    0
)
size = 1
