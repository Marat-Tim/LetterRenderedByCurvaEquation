from common import *

expr = Eq(
    x * (Abs(x) - S(1) / 2) * (y + 1)
    * sqrt(
        (S(1) / 2 + eps - Abs(x)) * (1 - y) /
        (y + 1 + eps)
    )
    ,
    0
)
size = 1
