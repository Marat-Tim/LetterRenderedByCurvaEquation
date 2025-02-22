from pyscript.js_modules import jsapi
from pyscript import document

def init_desmos():
    jsapi.init_desmos()

def set_expr(expr_id: str, expr: str):
    jsapi.set_expression(expr_id, expr)

def clear():
    jsapi.clear()

def log(text: str):
    jsapi.log(text)

def alert_user(text: str):
    jsapi.alert_user(text)

def getValueById(id: str):
    return document.getElementById(id).value