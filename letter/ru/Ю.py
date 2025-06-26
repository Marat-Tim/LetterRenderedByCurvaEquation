from common import *

expr = Eq(
    y
    * (x + S(1) / 2)
    * (16 * x ** 2 - 8 * x + y ** 2)
    * sqrt(
        ((x + S(1) / 2 + eps) * (16 * x ** 2 - 8 * x + y ** 2 + eps)) /
        ((1 - Abs(y)) * (S(1) / 2 + eps - x))
    )
    ,
    0
)
size = 1
