/**
 * Конвертер математических выражений в LaTeX для Desmos.
 * Принимает строку вида "(y + 4*abs(x) - 1) / sqrt(1 - abs(y))"
 * и возвращает LaTeX строку.
 *
 * Поддерживает: +, -, *, /, ^, abs(), sqrt(), числа, переменные x и y.
 */

// Токенизатор
function tokenize(str) {
    const tokens = [];
    let i = 0;
    while (i < str.length) {
        if (/\s/.test(str[i])) { i++; continue; }
        if (/[0-9]/.test(str[i])) {
            let num = '';
            while (i < str.length && /[0-9.]/.test(str[i])) num += str[i++];
            tokens.push({ type: 'num', val: num });
        } else if (/[a-zA-Z_]/.test(str[i])) {
            let name = '';
            while (i < str.length && /[a-zA-Z_0-9]/.test(str[i])) name += str[i++];
            tokens.push({ type: 'name', val: name });
        } else if ('+-*/^()'.includes(str[i])) {
            tokens.push({ type: 'op', val: str[i++] });
        } else {
            throw new Error(`Неизвестный символ: ${str[i]}`);
        }
    }
    return tokens;
}

// Парсер (рекурсивный спуск)
// Грамматика:
//   expr   = term (('+' | '-') term)*
//   term   = unary (('*' | '/') unary)*
//   unary  = '-' unary | power
//   power  = atom ('^' unary)?
//   atom   = num | name | name '(' expr ')' | '(' expr ')'

function parse(tokens) {
    let pos = 0;

    function peek() { return tokens[pos]; }
    function consume(val) {
        const t = tokens[pos++];
        if (val !== undefined && t.val !== val) throw new Error(`Ожидалось '${val}', получено '${t?.val}'`);
        return t;
    }

    function parseExpr() {
        let left = parseTerm();
        while (peek() && (peek().val === '+' || peek().val === '-')) {
            const op = consume().val;
            const right = parseTerm();
            left = { type: op, left, right };
        }
        return left;
    }

    function parseTerm() {
        let left = parseUnary();
        while (peek() && (peek().val === '*' || peek().val === '/')) {
            const op = consume().val;
            const right = parseUnary();
            left = { type: op, left, right };
        }
        return left;
    }

    function parseUnary() {
        if (peek() && peek().val === '-') {
            consume('-');
            return { type: 'neg', arg: parseUnary() };
        }
        return parsePower();
    }

    function parsePower() {
        let base = parseAtom();
        if (peek() && peek().val === '^') {
            consume('^');
            const exp = parseUnary();
            return { type: '^', base, exp };
        }
        return base;
    }

    function parseAtom() {
        const t = peek();
        if (!t) throw new Error('Неожиданный конец выражения');

        if (t.type === 'num') {
            consume();
            return { type: 'num', val: t.val };
        }

        if (t.type === 'name') {
            consume();
            if (peek() && peek().val === '(') {
                consume('(');
                const arg = parseExpr();
                consume(')');
                return { type: 'func', name: t.val, arg };
            }
            return { type: 'var', val: t.val };
        }

        if (t.val === '(') {
            consume('(');
            const inner = parseExpr();
            consume(')');
            return { type: 'group', inner };
        }

        throw new Error(`Неожиданный токен: ${t.val}`);
    }

    const ast = parseExpr();
    if (pos !== tokens.length) throw new Error(`Лишние токены начиная с позиции ${pos}: ${tokens[pos]?.val}`);
    return ast;
}

// Генератор LaTeX из AST
function astToLatex(node) {
    switch (node.type) {
        case 'num': {
            // Преобразуем десятичные в дроби для красивого LaTeX
            const f = decimalToFrac(node.val);
            if (f) return `\\frac{${f[0]}}{${f[1]}}`;
            return node.val;
        }
        case 'var':
            return node.val;
        case 'neg':
            return `-${wrapIfNeeded(node.arg, 'neg')}`;
        case '+':
            return `${astToLatex(node.left)} + ${astToLatex(node.right)}`;
        case '-':
            return `${astToLatex(node.left)} - ${wrapIfNeeded(node.right, '-')}`;
        case '*':
            return `${wrapIfNeeded(node.left, '*')} \\cdot ${wrapIfNeeded(node.right, '*')}`;
        case '/':
            return `\\frac{${astToLatex(node.left)}}{${astToLatex(node.right)}}`;
        case '^':
            return `${wrapBase(node.base)}^{${astToLatex(node.exp)}}`;
        case 'group':
            return `\\left(${astToLatex(node.inner)}\\right)`;
        case 'func':
            if (node.name === 'sqrt') return `\\sqrt{${astToLatex(node.arg)}}`;
            if (node.name === 'abs')  return `\\left|${astToLatex(node.arg)}\\right|`;
            throw new Error(`Неизвестная функция: ${node.name}`);
        default:
            throw new Error(`Неизвестный тип узла: ${node.type}`);
    }
}

// Оборачивает в скобки если нужно по приоритету
function wrapIfNeeded(node, parentOp) {
    const needsWrap =
        (parentOp === '*' && (node.type === '+' || node.type === '-')) ||
        (parentOp === '-' && (node.type === '+' || node.type === '-')) ||
        (parentOp === 'neg' && (node.type === '+' || node.type === '-'));
    if (needsWrap) return `\\left(${astToLatex(node)}\\right)`;
    return astToLatex(node);
}

// Основание степени оборачиваем в скобки если это не атом
function wrapBase(node) {
    if (node.type === 'num' || node.type === 'var') return astToLatex(node);
    return `\\left(${astToLatex(node)}\\right)`;
}

// Конвертация десятичного числа в дробь (только простые случаи)
function decimalToFrac(str) {
    if (!str.includes('.')) return null;
    const [intPart, fracPart] = str.split('.');
    const denom = Math.pow(10, fracPart.length);
    const numer = parseInt(intPart) * denom + parseInt(fracPart);
    const g = gcd(numer, denom);
    return [numer / g, denom / g];
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

/**
 * Главная функция: принимает строку выражения, возвращает LaTeX.
 */
export function mathToLatex(exprStr) {
    const tokens = tokenize(exprStr);
    const ast = parse(tokens);
    return astToLatex(ast);
}
