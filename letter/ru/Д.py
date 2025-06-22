from common import *

# TODO Почему то desmos оставляет пустым пересечение прямоугольников, поэтому пришлось их немного разделить
micro_eps = 0.01

expr = Eq(
    div(
        (Abs(x - y - 1 - micro_eps) + Abs(x + y + 1 + micro_eps) - 1)
        * (Abs(2 * x - S(2) / 3 * y + S(1) / 6) + Abs(2 * x + S(2) / 3 * y - S(1) / 6) - 1),
        sqrt(y + 1)
    )
    ,
    0
)
size = 1
