const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',];
const action = ['C', '=', '-', '+', 'X', '÷', 'x2', 'x3', 'xy', '10x', '1/x', '2√x', '3√x', 'y√x', '!', '%', '+/-', 'MC', 'MR', 'M+', 'M-'];

//реализация
export default function Calculator() {
    let a = '', b = '', c = '', sign = '', memory = 0, finish = false, prevFinish = true;
    const out = document.querySelector('.screen p');

    this.clearAll = function () {
        a = '';
        b = '';
        c = '';
        sign = '';
        finish = false;
        out.textContent = 0;
    }

    this.doubleSqrt = function (number) {
        let t;
        let squareRoot = number / 2;
        do {
            t = squareRoot;
            squareRoot = (t + (number / t)) / 2;
        } while ((t - squareRoot) !== 0);
        return squareRoot;
    }

    this.factorial = function (n) {
        if (n < 0 || !Number.isInteger(n)) return 0;
        if (n === 0 || n === 1) return 1;
        if (n > 1) return n * this.factorial(n - 1);
    }

    this.setColor = function (number) {
        if (number === '1') {
            let newColor = document.querySelector('#color_pick1').value;
            document.querySelectorAll('.calc').forEach(e => e.style.backgroundColor = newColor);
        } else {
            let newColor = document.querySelector('#color_pick2').value;
            document.querySelectorAll('.button').forEach(e => e.style.backgroundColor = newColor);
        }
    }

    this.equal = function () {
        prevFinish = true;
        switch (sign) {
            case "+":
                if (b === '') b = 0;
                a = (+a) + (+b);
                break;
            case "-":
                if (b === '') b = 0;
                a = a - b;
                break;
            case "X":
                if (b === '') b = 1;
                a = a * b;
                break;
            case '÷':
                if (+b === 0) {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
            case '1/x':
                if (b === '') return;
                if (+b === 0) {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                sign = '';
                b = '';
                break;
            case "^":
                if (!Number.isInteger(+b)) {
                    if (+a < 0) {
                        a = (-a) ** (b);
                        a = -a;
                    } else {
                        a = a ** (b);
                    }
                    break;
                }
                if (b === '') return;
                if (+b === 0 || b === '') {
                    a = 1;
                    break;
                }
                c = a;
                if ((+b) < 0) {
                    while (++b && isFinite(+c)) c *= a;
                    a = 1 / c;
                    break;
                }
                while (--b && isFinite(+c)) c *= a;
                a = c;
                sign = '';
                b = '';
                break;
            case '√':
                if ((a < 0 && +b % 2 === 0) || b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                if (a === '0') break;
                if (+b === 2) a = this.doubleSqrt(a);
                else {
                    if (+a < 0) {
                        a = (-a) ** (1.0 / b);
                        a = -a;
                    } else {
                        a = a ** (1.0 / b);
                    }
                }
                sign = '';
                b = '';
                break;
            case '10x':
                if (b === '') return;
                if (+b === 0) {
                    a = 1;
                    break;
                }
                a = 10;
                c = a;
                if ((+b) < 0) {
                    while (++b && isFinite(+c)) c *= a;
                    a = 1 / c;
                    break;
                }
                while (--b && isFinite(+c)) c *= a;
                a = c;
                sign = '';
                b = '';
                break;
            case '!':
                if (a === '') a = 0;
                a = this.factorial(+a);
                break;
        }
        finish = true;
        if (a) out.textContent = a;
        else out.textContent = '0';
        console.log(a, sign, b);
        //если символы выходят за границу дисплея
        if (out.textContent.length > 12) out.textContent = a.toExponential(2);
    };

    this.pressButton = function (btn) {
        if (!isFinite(a) || isNaN(a)) a = '';
        if (isNaN(b)) b = '';
        if (b === '' && sign === '') {
            if (+a === 0) a = '';
            a += btn;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            a = btn;
            b = '';
            sign = '';
            finish = false;
            out.textContent = a;
        } else if (a !== '' && b === '' && !finish && prevFinish) {
            b = btn;
            if (sign === '10x') out.innerHTML = `10<sup>${b}</sup>`;
            else if (sign === '^') out.innerHTML = `${a}<sup>${b}</sup>`;
            else if (sign === '1/x') out.innerHTML = `1/${b}`;
            else if (sign === '√') out.innerHTML = `<sup class="sup_qrt">${b}</sup>√<span class="span_qrt">${a}</span>`;
            else out.textContent = b;
        } else {
            b += btn;
            if (sign === '10x') out.innerHTML = `10<sup>${b}</sup>`;
            else if (sign === '^') out.innerHTML = `${a}<sup>${b}</sup>`;
            else if (sign === '1/x') out.innerHTML = `1/${b}`;
            else if (sign === '√') out.innerHTML = `<sup class="sup_qrt">${b}</sup>√<span class="span_qrt">${a}</span>`;
            else out.textContent = b;
        }
        console.log(a, sign, b);
        //если символы выходят за границу дисплея
        if (!(sign === '^' || sign === '10x') && out.textContent.length > 12) out.textContent = out.textContent.slice(out.textContent.length - 12, out.textContent.length + 1);
        prevFinish = false;
    }

    this.pressSign = function (btn) {
        finish = false;
        if (!isFinite(a) || isNaN(a)) a = '';
        if (isNaN(b)) b = '';
        if (btn === 'C') {
            this.clearAll();
            return;
        }
        if (btn === '/'){
            sign = '÷';
            out.textContent = sign;
            return;
        }
        if (btn === '*'){
            sign = 'X';
            out.textContent = sign;
            return;
        }
        if (btn === 'xy') {
            if (a === '') a = '0';
            out.innerHTML = `${a}<sup>&#9633;</sup>`;
            sign = '^';
            b = '';
            return;
        }
        if (btn === 'x2') {
            if (a === '') a = '0';
            out.innerHTML = `${a}<sup>2</sup>`;
            sign = '^';
            b = 2;
            return;
        }
        if (btn === 'x3') {
            if (a === '') a = '0';
            out.innerHTML = `${a}<sup>3</sup>`;
            sign = '^';
            b = 3;
            return;
        }
        if (btn === '10x') {
            out.innerHTML = `10<sup>&#9633;</sup>`;
            sign = '10x';
            b = '';
            finish = false;
            return;
        }
        if (btn === '1/x') {
            out.innerHTML = `1/&#9633;`;
            sign = '1/x';
            a = '1';
            b = '';
            return;
        }
        if (btn === '2√x') {
            if (a === '') a = '0';
            out.innerHTML = `<sup class="sup_qrt">2</sup>√<span class="span_qrt">${a}</span>`;
            sign = '√';
            b = '2';
            return;
        }
        if (btn === '3√x') {
            if (a === '') a = '0';
            out.innerHTML = `<sup class="sup_qrt">3</sup>√<span class="span_qrt">${a}</span>`;
            sign = '√';
            b = '3';
            return;
        }
        if (btn === 'y√x') {
            if (a === '') a = '0';
            out.innerHTML = `<sup class="sup_qrt">&#9633;</sup>√<span class="span_qrt">${a}</span>`;
            sign = '√';
            b = '';
            return;
        }
        if (btn === '%') {
            if (a === '') a = '0';
            out.textContent = a + "%";
            a /= 100;
            sign = 'X';
            return;
        }
        if (btn === '!') {
            if (a === '') a = '0';
            out.textContent = a + "!";
            sign = '!';
            return;
        }
        if (btn === 'MC') {
            memory = 0;
            return;
        }
        if (btn === 'MR') {
            if (a !== '' && sign !== '') {
                b = memory;
                if (sign === '10x') out.innerHTML = `10<sup>${b}</sup>`;
                else if (sign === '^') out.innerHTML = `${a}<sup>${b}</sup>`;
                else if (sign === '1/x') out.innerHTML = `1/${b}`;
                else if (sign === '√') out.innerHTML = `<sup class="sup_qrt">${b}</sup>√<span class="span_qrt">${a}</span>`;
                else out.textContent = b;
            } else {
                a = memory;
                out.textContent = a;
            }
            return;
        }
        if (btn === 'M+') {
            if(!prevFinish){
                this.equal();
            }
            memory += (+a);
            return;
        }
        if (btn === 'M-') {
            if(!prevFinish){
                this.equal();
            }
            memory -= (+a);
            return;
        }
        if (btn === '+/-') {
            if (action.includes(out.textContent)) return
            if (a !== '' && b === '' || a !== '' && b !== '' && finish) {
                a = -(+a);
                out.textContent = a;
            }
            if (a !== '' && b !== '' && !finish) {
                b = -(+b);
                if (sign === '10x') out.innerHTML = `10<sup>${b}</sup>`;
                else if (sign === '^') out.innerHTML = `${a}<sup>${b}</sup>`;
                else if (sign === '1/x') out.innerHTML = `1/${b}`;
                else out.textContent = b;
            }
            return;
        }
        if (btn === '=' || btn === 'Enter') {
            this.equal();
            return;
        }
        if (sign !== '' && a !== '' && b !== '' && !finish) {
            if(!prevFinish)this.equal();
            b = '';
            finish = false;
        }
        sign = btn;
        out.textContent = sign;
        console.log(a, sign, b);
    }

    this.setResult = function (value) {
        a = value[0];
        b = value[1];
        c = value[2];
        sign = value[3];
        finish = value[4];
        if (sign === '10x' || sign === '^' || sign === '1/x' || sign === '√') {
            out.innerHTML = value[5];
        } else {
            out.textContent = value[5];
        }
        console.log(a, sign, b);
    };

    this.getResult = function () {
        if (sign === '10x' || sign === '^' || sign === '1/x' || sign === '√') {
            return [a, b, c, sign, finish, out.innerHTML];
        } else {
            return [a, b, c, sign, finish, out.textContent];
        }
    };
};
