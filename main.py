from dataclasses import dataclass
from typing import Callable
import sympy as sp
from sympy import Abs, S, sqrt, latex
import jsapi
import re
from pyscript import document

indent_size = S(1) / 2

jsapi.init_desmos()

@dataclass
class Letter:
    # Принимает центр где нужно рисовать букву, возвращает выражение рисующее букву в данном центре
    expr: Callable[[sp.Expr], str]
    size: float
    equals_zero: bool

y = sp.Symbol('y')
x1 = sp.Symbol('x')
eps = 0.1

char_to_letter = {
    'А': Letter(
        lambda x: (y + 4 * Abs(x) - 1) * (y + S(1) / 4) * sqrt(S(1 + eps - y - 4 * Abs(x)) / (1 - Abs(y))),
        size=1, equals_zero=True)
}

def is_correct(text: str) -> bool:
    return re.compile(r'[А-Я]*').fullmatch(text) is not None

def count_total_size(text: str) -> float:
    jsapi.log(f"Начало метода count_total_size({text})")
    return sum([char_to_letter[c].size + indent_size for c in text]) - indent_size

def final_eq(letter, x: sp.Expr) -> str:
    if letter.equals_zero:
        return latex(sp.Eq(letter.expr(x), 0))
    else:
        return latex(sp.Eq(y, letter.expr(x)))

def graph(event):
    try:
        jsapi.log("Очищаем элемент десмоса")
        jsapi.clear()
        jsapi.log("Получаем текст из формы для ввода")
        text = document.getElementById("text").value
        jsapi.log(f"Считали текст = [{text}]")
        text = text.upper()
        jsapi.log("Проверяем текст на корректность")
        if not is_correct(text):
            jsapi.alert("Можно нарисовать только символы русского алфавита")
            return
        jsapi.log("Считаем итоговый размер рисуемой строки")
        total_size = count_total_size(text)
        jsapi.log("Вычисляем крайнюю левую границу рисуемого текста")
        curr = -S(total_size) / 2
        for i in range(len(text)):
            jsapi.log(f"Начинаем рисовать символ номер {i}")
            letter = char_to_letter[text[i]]
            center = curr + S(letter.size) / 2
            x = x1 - center
            jsapi.log("Устанавливаем итоговое выражение в элемент десмоса")
            jsapi.set_expr(str(i), final_eq(letter, x))
            curr += letter.size + indent_size
    except Exception as ex:
        jsapi.log(str(ex))
