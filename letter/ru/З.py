from common import *

expr = Eq(
    div(
        (x ** 2 + (Abs(y) - S(1) / 2) ** 2 - S(1) / 4),
        sqrt(x + Abs(y))
    )
    ,
    0
)
size = 1
