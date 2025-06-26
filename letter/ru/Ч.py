from common import *

expr = Eq(
    div(
        (Abs(x) - S(1) / 2) * y,
        sqrt((x + y + S(1) / 2) * (S(1) / 2 + eps - x) * (1 - y))
    )
    ,
    0
)
size = 1
