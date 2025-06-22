from common import *

expr = Eq(
    div(
        (Abs(y) - 1)
        * y
        * (x + S(1) / 2)
        * sqrt((x + S(1) / 2 + eps) * (1 + eps - Abs(y))),
        sqrt(S(1) / 2 - x)
    )
    ,
    0
)
size = 1
