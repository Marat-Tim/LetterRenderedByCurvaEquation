from common import *

expr = Eq(
    div(
        (Abs(x) - S(1) / 2) * (y - eps) * sqrt(S(1) / 2 + eps - Abs(x)),
        sqrt(1 - Abs(y))
    )
    ,
    0
)
size = 1
