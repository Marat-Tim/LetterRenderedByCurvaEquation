import { mathToLatex } from './mathToLatex.js';

export class Letter {
    constructor(exprStr, size) {
        this._exprStr = exprStr;
        this._size = size;
    }

    exprLatex(center) {
        if (!this._exprStr) {
            throw new Error("Пытаемся получить выражение для пробела");
        }
        // Заменяем x на (x - center) текстово, сохраняя структуру выражения
        const substituted = substituteX(this._exprStr, center);
        return mathToLatex(substituted);
    }

    size() {
        return this._size;
    }
}

/**
 * Заменяет все вхождения переменной x на (x - center) в строке выражения.
 * Учитывает что x не должна быть частью другого имени (abs, sqrt и т.д.)
 */
function substituteX(exprStr, center) {
    if (center === 0) return exprStr;
    const replacement = center > 0
        ? `(x - ${center})`
        : `(x + ${-center})`;
    // Заменяем x только там где это отдельная переменная (не часть имени функции)
    return exprStr.replace(/\bx\b/g, replacement);
}
