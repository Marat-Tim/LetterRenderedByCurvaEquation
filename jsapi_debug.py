def init_desmos():
    print('init_desmos()')

def set_expr(expr_id: str, expr: str):
    print(f'set_expr("{expr_id}", "{expr}")')

def clear():
    print('clear()')

def log(text: str):
    print(f'log("{text}")')

def alert_user(text: str):
    print(f'alert_user("{text}")')

def getValueById(id: str):
    ret = "АА"
    print(f'getValueById("{id}")="{ret}"')
    return ret