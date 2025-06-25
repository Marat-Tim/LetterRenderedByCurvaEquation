from common import *

expr = Eq(
    div(
        Abs(y) - 2 * Abs(x),
        sqrt(1 - Abs(y))
    )
    ,
    0
)
size = 1
