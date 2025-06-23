from common import *

expr = Eq(
    div(
        (x + S(1) / 2) * (Abs(y) - x - S(1) /2),
        sqrt(1 - Abs(y)),
    )
    ,
    0
)
size = 1
