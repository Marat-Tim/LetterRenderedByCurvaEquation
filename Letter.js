// math.js подключён глобально через <script> в index.html

export class Letter {
    constructor(exprStr, size) {
        this._exprStr = exprStr;
        this._size = size;
    }

    exprLatex(center) {
        if (!this._exprStr) {
            throw new Error("Пытаемся получить выражение для пробела");
        }
        const centerStr = toExactFraction(center);
        const substitution = center === 0 ? 'x' : `(x - ${centerStr})`;
        const withSubst = this._exprStr.replace(/\bx\b/g, substitution);
        const simplified = math.simplify(withSubst);
        return fixLatex(simplified.toTex());
    }

    size() {
        return this._size;
    }
}

// Конвертирует число в строку точной дроби: 1.5 → "3/2", 0.5 → "1/2"
function toExactFraction(num) {
    if (Number.isInteger(num)) return String(num);
    const str = num.toString();
    const decimals = (str.split('.')[1] || '').length;
    const denom = Math.pow(10, decimals);
    const numer = Math.round(num * denom);
    const g = gcd(Math.abs(numer), denom);
    return `${numer / g}/${denom / g}`;
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

// Исправляет артефакты LaTeX генерации math.js которые мешают Desmos
function fixLatex(latex) {
    // \frac{-n}{d} → -\frac{n}{d}
    latex = latex.replace(/\\frac\{-(\d+)\}\{(\d+)\}/g, '-\\frac{$1}{$2}');
    // + -\frac → - \frac
    latex = latex.replace(/\+\s*-\\frac/g, '- \\frac');
    // \cdot-n → \cdot\left(-n\right)
    latex = latex.replace(/\\cdot-(\d)/g, '\\cdot\\left(-$1\\right)');
    latex = latex.replace(/\\cdot-\\frac/g, '\\cdot\\left(-\\frac');
    return latex;
}
