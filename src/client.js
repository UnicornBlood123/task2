import User from './invoker.js';
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',];
const action = ['C', '=', '-', '+', 'X', '÷', 'x2', 'x3', 'xy', '10x', '1/x', '2√x', '3√x', 'y√x', '!', '%', '+/-', 'MC', 'MR', 'M+', 'M-'];
//отправитель
let acc = new User();

//обработчики событий
document.querySelector('.buttons').onclick = (event) => {
    //клик мимо кнопки или AC
    if (!event.target.closest('.button')) return;
    //нажатая кнопка
    const btn = event.target.closest('.button').textContent;
    //если нажата кнопка отмены(←)
    if (btn === '←') {
        acc.undo();
    }
    //если нажата цифра или точка
    if (digit.includes(btn)) {
        acc.pressButton(btn);
    }
    //если нажат знак операции
    if (action.includes(btn)) {
        acc.pressSign(btn);
    }
}

document.querySelector('#color_pick1').onchange = () => {
    acc.pressColor('1');
}

document.querySelector('#color_pick2').onchange = () => {
    acc.pressColor('2');
}

document.addEventListener('keydown', function(event) {
    if ((event.code === 'KeyZ' && (event.ctrlKey)) || event.code === 'Backspace') {
        acc.undo();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key >= 0 && event.key  <= 9 || event.key === '.') {
        acc.pressButton(event.key);
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === '+' || event.key === '-' || event.key === '=' || event.key === '*' || event.key === '/' || event.code === 'Enter') {
        acc.pressSign(event.key);
    }
});