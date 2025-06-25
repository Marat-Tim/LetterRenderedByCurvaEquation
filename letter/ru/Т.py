from common import *

expr = Eq(
    div(
        x * (y - 1) * sqrt(1 + eps - y),
        sqrt((S(1) / 2 - Abs(x)) * (y + 1))
    )
    ,
    0
)
size = 1
