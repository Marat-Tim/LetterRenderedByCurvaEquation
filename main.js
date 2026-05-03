import { Letter } from './Letter.js';
import { initDesmos, setExpression, clear, log, alertUser } from './jsapi.js';
import { INDENT_SIZE } from './config.js';

const charToLetter = { ' ': new Letter(null, 1) };

const letterFiles = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М',
    'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
];

async function loadLetters() {
    for (const char of letterFiles) {
        try {
            const module = await import(`./letter/ru/${char}.js`);
            charToLetter[char] = module.letter;
            log(`Loaded letter ${char}`);
        } catch (e) {
            log(`Error loading letter ${char}: ${e.message}`);
        }
    }
}

function validate(text) {
    const incorrect = [];
    for (const c of text) {
        if (c !== ' ' && !(c in charToLetter)) {
            incorrect.push(c);
        }
    }
    if (incorrect.length > 0) {
        throw new Error(`Символы ${incorrect} на данный момент не поддерживаются`);
    }
}

function countTotalSize(text) {
    log(`Начало метода countTotalSize(${text})`);
    let total = 0;
    for (let i = 0; i < text.length; i++) {
        total += charToLetter[text[i]].size() + INDENT_SIZE;
    }
    return total - INDENT_SIZE;
}

async function graph(event) {
    try {
        log('Очищаем элемент десмоса');
        clear();
        
        log('Получаем текст из формы для ввода');
        const input = document.getElementById('text');
        let text = input.value.toUpperCase();
        log(`Считали текст = [${text}]`);
        
        log('Проверяем текст на корректность');
        validate(text);
        
        log('Считаем итоговый размер рисуемой строки');
        const totalSize = countTotalSize(text);
        
        log('Вычисляем крайнюю левую границу рисуемого текста');
        let curr = -totalSize / 2;
        
        for (let i = 0; i < text.length; i++) {
            log(`Начинаем рисовать символ номер ${i}`);
            if (text[i] === ' ') {
                curr += 1 + INDENT_SIZE;
            } else {
                const letter = charToLetter[text[i]];
                const center = curr + letter.size() / 2;
                const finalExpr = letter.exprLatex(center);
                log(`Устанавливаем итоговое выражение в элемент десмоса, уравнение: ${finalExpr}`);
                setExpression(i.toString(), finalExpr);
                curr += letter.size() + INDENT_SIZE;
            }
        }
    } catch (ex) {
        log(ex.toString());
        alertUser(ex.toString());
    }
}

async function init() {
    log('Initializing Desmos...');
    const elt = document.getElementById('calculator');
    window.desmosCalculator = Desmos.GraphingCalculator(elt);
    initDesmos();
    
    log('Loading letters...');
    await loadLetters();
    
    log('Letters loaded, ready to draw');
    
    const button = document.getElementById('draw');
    button.addEventListener('click', graph);
    
    const params = new URLSearchParams(window.location.search);
    const text = params.get('text');
    if (text) {
        const input = document.getElementById('text');
        input.value = text;
        setTimeout(() => button.click(), 1000);
    }
}

document.addEventListener('DOMContentLoaded', init);
