from common import *

expr = Eq(
    div(
        (Abs(y) - Abs(2 * x))
        * x,
        sqrt(1 - Abs(y))
    )
    ,
    0
)
size = 1
