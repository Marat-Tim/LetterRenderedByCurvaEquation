from typing import Callable
import sympy as sp

class Letter:
    def __init__(self, expr: Callable[[sp.Expr], sp.Expr], size: float):
        self._expr = expr
        self._size = size

    def expr_latex(self, x: sp.Expr) -> str:
        return sp.latex(self._expr(x))

    def size(self) -> float:
        return self._size