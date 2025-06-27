let calculator;

export function log(text) {
    console.log(text)
}

export function init_desmos() {
    calculator = window.desmosCalculator
}

export function set_expression(id, latex) {
    calculator.setExpression({'id': id, 'latex': latex})
}

export function clear() {
    calculator.setBlank()
}

export function alert_user(msg) {
    alert(msg)
}