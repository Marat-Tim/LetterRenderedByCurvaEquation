from common import *

expr = Eq(
    div(
        (x + S(1) / 2)
        * (S(1) / 4 * (x + S(1) / 2) ** 2 + y ** 2 + y)
        * (y - 1)
        * sqrt(x + y - S(1) / 2 + eps + Abs(x + S(3) / 2 - y)),
        sqrt((S(1) / 2 - x - y) * (y + 8 * x + 5))
    )
    ,
    0
)
size = 1
