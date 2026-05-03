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
        case 'func': {
            // Внутри sqrt и abs скобки не нужны — убираем лишний group
            const arg = node.arg.type === 'group' ? node.arg.inner : node.arg;
            if (node.name === 'sqrt') return `\\sqrt{${astToLatex(arg)}}`;
            if (node.name === 'abs')  return `\\left|${astToLatex(arg)}\\right|`;
            throw new Error(`Неизвестная функция: ${node.name}`);
        }
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
    if (node.type === 'group') return astToLatex(node); // уже в скобках
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

// ─── Рациональная арифметика ────────────────────────────────────────────────

function frac(n, d = 1) {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(Math.abs(n), d);
    return { n: n / g, d: d / g };
}

function fracAdd(a, b) { return frac(a.n * b.d + b.n * a.d, a.d * b.d); }
function fracSub(a, b) { return frac(a.n * b.d - b.n * a.d, a.d * b.d); }
function fracMul(a, b) { return frac(a.n * b.n, a.d * b.d); }
function fracDiv(a, b) { return frac(a.n * b.d, a.d * b.n); }
function fracNeg(a)    { return frac(-a.n, a.d); }
function fracPow(a, b) {
    // Только целые показатели
    if (b.d !== 1) return null;
    const e = b.n;
    if (e >= 0) return frac(Math.pow(a.n, e), Math.pow(a.d, e));
    return frac(Math.pow(a.d, -e), Math.pow(a.n, -e));
}

// Парсим числовой литерал в дробь
function numToFrac(val) {
    if (!val.includes('.')) return frac(parseInt(val));
    const [intPart, fracPart] = val.split('.');
    const d = Math.pow(10, fracPart.length);
    const n = parseInt(intPart) * d + parseInt(fracPart);
    return frac(n, d);
}

// Узел-дробь обратно в AST
function fracToNode(f) {
    if (f.d === 1) {
        if (f.n >= 0) return { type: 'num', val: String(f.n) };
        return { type: 'neg', arg: { type: 'num', val: String(-f.n) } };
    }
    if (f.n < 0) {
        return { type: 'neg', arg: { type: '/', left: { type: 'num', val: String(-f.n) }, right: { type: 'num', val: String(f.d) } } };
    }
    return { type: '/', left: { type: 'num', val: String(f.n) }, right: { type: 'num', val: String(f.d) } };
}

// ─── Constant folding ────────────────────────────────────────────────────────
// Возвращает дробь если узел — чистая константа, иначе null

function evalConst(node) {
    switch (node.type) {
        case 'num':  return numToFrac(node.val);
        case 'neg': {
            const a = evalConst(node.arg);
            return a ? fracNeg(a) : null;
        }
        case '+': {
            const a = evalConst(node.left), b = evalConst(node.right);
            return (a && b) ? fracAdd(a, b) : null;
        }
        case '-': {
            const a = evalConst(node.left), b = evalConst(node.right);
            return (a && b) ? fracSub(a, b) : null;
        }
        case '*': {
            const a = evalConst(node.left), b = evalConst(node.right);
            return (a && b) ? fracMul(a, b) : null;
        }
        case '/': {
            const a = evalConst(node.left), b = evalConst(node.right);
            return (a && b && b.n !== 0) ? fracDiv(a, b) : null;
        }
        case '^': {
            const a = evalConst(node.base), b = evalConst(node.exp);
            return (a && b) ? fracPow(a, b) : null;
        }
        case 'group': return evalConst(node.inner);
        default: return null;
    }
}

// Разбивает сумму/разность в плоский список { node, sign }
// sign = +1 или -1 (знак слагаемого)
function flattenSum(node, sign = +1) {
    if (node.type === 'group') return flattenSum(node.inner, sign);
    if (node.type === '+') return [...flattenSum(node.left, sign), ...flattenSum(node.right, sign)];
    if (node.type === '-') return [...flattenSum(node.left, sign), ...flattenSum(node.right, -sign)];
    if (node.type === 'neg') return flattenSum(node.arg, -sign);
    return [{ node, sign }];
}

// Собирает список слагаемых обратно в AST
function buildSum(terms) {
    // terms: [{ node, sign }], все sign уже учтены в node (neg если -1)
    if (terms.length === 0) return { type: 'num', val: '0' };
    let result = terms[0].sign === -1
        ? { type: 'neg', arg: terms[0].node }
        : terms[0].node;
    for (let i = 1; i < terms.length; i++) {
        const { node, sign } = terms[i];
        result = sign === +1
            ? { type: '+', left: result, right: node }
            : { type: '-', left: result, right: node };
    }
    return result;
}

// Упрощает сумму: сворачивает все константные слагаемые в одно
function simplifySum(node) {
    const terms = flattenSum(node);
    // Разделяем на константные и переменные слагаемые
    const constTerms = [];
    const varTerms = [];
    for (const { node: t, sign } of terms) {
        const c = evalConst(t);
        if (c !== null) {
            constTerms.push({ val: sign === +1 ? c : fracNeg(c) });
        } else {
            varTerms.push({ node: t, sign });
        }
    }
    // Если нет констант для свёртки или нет переменных — не меняем
    if (constTerms.length <= 1 && varTerms.length === terms.length) return null;
    // Суммируем все константы
    const totalConst = constTerms.reduce((acc, { val }) => fracAdd(acc, val), frac(0));
    // Собираем результат: сначала переменные, потом константа
    const result = [...varTerms];
    if (totalConst.n !== 0) {
        result.push({ node: fracToNode(frac(Math.abs(totalConst.n), totalConst.d)), sign: totalConst.n > 0 ? +1 : -1 });
    }
    if (result.length === 0) return fracToNode(frac(0));
    return buildSum(result);
}

// Рекурсивно упрощает AST: сворачивает константные подвыражения
function simplify(node) {
    // Сначала пробуем свернуть весь узел целиком
    const c = evalConst(node);
    if (c !== null) return fracToNode(c);

    // Иначе рекурсивно упрощаем дочерние узлы
    switch (node.type) {
        case 'num':
        case 'var':
            return node;
        case 'neg':
            return { type: 'neg', arg: simplify(node.arg) };
        case 'group': {
            const inner = simplify(node.inner);
            // Убираем лишние скобки вокруг атомов и вложенных групп
            if (inner.type === 'num' || inner.type === 'var' || inner.type === 'group') return inner;
            return { type: 'group', inner };
        }
        case '+':
        case '-': {
            const left  = simplify(node.left);
            const right = simplify(node.right);
            const merged = evalConst({ ...node, left, right });
            if (merged !== null) return fracToNode(merged);
            // Сворачиваем все константные слагаемые в одно
            const summed = simplifySum({ ...node, left, right });
            if (summed !== null) return summed;
            return { ...node, left, right };
        }
        case '*':
        case '/': {
            const left  = simplify(node.left);
            const right = simplify(node.right);
            const merged = evalConst({ ...node, left, right });
            if (merged !== null) return fracToNode(merged);
            return { ...node, left, right };
        }
        case '^': {
            const base = simplify(node.base);
            const exp  = simplify(node.exp);
            const merged = evalConst({ ...node, base, exp });
            if (merged !== null) return fracToNode(merged);
            return { ...node, base, exp };
        }
        case 'func':
            return { ...node, arg: simplify(node.arg) };
        default:
            return node;
    }
}

/**
 * Главная функция: принимает строку выражения, возвращает LaTeX.
 */
export function mathToLatex(exprStr) {
    const tokens = tokenize(exprStr);
    const ast = parse(tokens);
    const simplified = simplify(ast);
    return astToLatex(simplified);
}
