from common import *
from letter.ru import А
from config import *

if debug:
    from jsapi_debug import *
else:
    from jsapi import *

init_desmos()

char_to_letter: dict[str, Letter] = {}

А.register(char_to_letter)

def validate(text: str):
    incorrect = []
    for c in text:
        if c not in char_to_letter:
            incorrect.append(c)
    if len(incorrect) > 0:
        raise ValueError(f"Символы {incorrect} на данный момент не поддерживаются")

def count_total_size(text: str) -> float:
    log(f"Начало метода count_total_size({text})")
    return sum([char_to_letter[c].size() + indent_size for c in text]) - indent_size

def graph(event):
    try:
        log("Очищаем элемент десмоса")
        clear()
        log("Получаем текст из формы для ввода")
        text = getValueById("text")
        log(f"Считали текст = [{text}]")
        text = text.upper()
        log("Проверяем текст на корректность")
        validate(text)
        log("Считаем итоговый размер рисуемой строки")
        total_size = count_total_size(text)
        log("Вычисляем крайнюю левую границу рисуемого текста")
        curr = -S(total_size) / 2
        for i in range(len(text)):
            log(f"Начинаем рисовать символ номер {i}")
            letter = char_to_letter[text[i]]
            center = curr + S(letter.size()) / 2
            x = x1 - center
            log("Устанавливаем итоговое выражение в элемент десмоса")
            set_expr(str(i), letter.expr_latex(x))
            curr += letter.size() + indent_size
    except ValueError as ex:
        log(str(ex))
        alert_user(str(ex))
    except Exception as ex:
        log(str(ex))
        alert_user("При отрисовке возникла ошибка")

if debug:
    graph(None)