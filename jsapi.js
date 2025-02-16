let calculator;

export function log(text) {
    console.log(text)
}

export function init_desmos() {
    const elt = document.getElementById('calculator')
    calculator = Desmos.GraphingCalculator(elt)
}

export function set_expression(id, latex) {
    calculator.setExpression({'id': id, 'latex': latex})
}

export function clear() {
    calculator.setBlank()
}