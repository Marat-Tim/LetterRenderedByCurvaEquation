from common import *

expr = Eq(
    div(
        x * (x ** 2 + (y - S(1) / 2) ** 2 - S(1) / 4),
        sqrt(1 - Abs(y))
    )
    ,
    0
)
size = 1
