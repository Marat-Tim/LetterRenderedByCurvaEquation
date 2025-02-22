import sympy as sp
from common import x

class Letter:
    def __init__(self, expr: sp.Expr, size: float):
        self._expr = expr
        self._size = size

    def expr_latex(self, arg: sp.Expr) -> str:
        return sp.latex(self._expr.subs(x, arg))

    def size(self) -> float:
        return self._size