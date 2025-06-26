from common import *

expr = Eq(
    div(
        (Abs(x + y / 2) + Abs(x - y / 2) - 1)
        * (Abs(x + y + S(1) / 2) + Abs(x - y - S(7) / 4) - S(1) / 4)
        * sqrt(x + y + S(1) / 4 + eps + Abs(x - y - S(7) / 4))
        * sqrt(x + S(1) / 2 + eps)
        * sqrt(y + S(5) / 4),
        sqrt(Abs(x) - y + S(1) / 2)
    )
    ,
    0
)
size = 1
