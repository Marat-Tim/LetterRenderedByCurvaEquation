let calculator;

export function log(text) {
    console.log(text);
}

export function initDesmos() {
    calculator = window.desmosCalculator;
}

export function setExpression(id, latex) {
    calculator.setExpression({ id, latex: latex + ' = 0' });
}

export function clear() {
    calculator.setBlank();
}

export function alertUser(msg) {
    alert(msg);
}