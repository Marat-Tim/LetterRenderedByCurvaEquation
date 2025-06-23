from common import *

expr = Eq(
    div(
        (Abs(x) - S(1) / 2) * (y - 2 * x) * (x ** 2 + (y - S(17) / 8) ** 2 - 1),
        sqrt(S(3) / 2 - Abs(y) - Abs(x)),
    )
    ,
    0
)
size = 1
