import sympy as sp
from sympy import Eq, Abs, S, Mul, Pow
from sympy import sqrt as Sqrt

y = sp.Symbol('y')
x = sp.Symbol('x')
eps = 0.1

def mul(*args):
    return Mul(*args, evaluate=False)

def div(a, b):
    return Mul(a, Pow(b, -1, evaluate=False), evaluate=False)

def sqrt(a):
    return Sqrt(a, evaluate=False)
