from pyscript.js_modules import jsapi

def init_desmos():
    jsapi.init_desmos()

def set_expr(expr_id: str, expr: str):
    jsapi.set_expression(expr_id, expr)

def clear():
    jsapi.clear()

def log(text: str):
    jsapi.log(text)

def alert(text: str):
    jsapi.alert(text)