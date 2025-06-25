from common import *

expr = Eq(
    div(
        (Abs(y) - 2 * Abs(x)) * sqrt(y - 2 * x + eps),
        sqrt(1 - Abs(y))
    )
    ,
    0
)
size = 1
