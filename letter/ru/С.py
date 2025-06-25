from common import *

expr = Eq(
    div(
        S(9) / 4 * (x - S(1) / 6) ** 2 + y ** 2 - 1,
        sqrt(S(1) / 2 - x)
    )
    ,
    0
)
size = 1
