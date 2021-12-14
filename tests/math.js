function sum(a, b) {
    return (+a) + (+b);
}
//module.exports = sum;

function sub(a, b) {
    return a - b;
}
//module.exports = sub;

function mul(a, b) {
    return a * b;
}
//module.exports = mul;

function div(a, b) {
    if (+b === 0) {
        return;
    }
    return a / b;
}
//module.exports = div;

function pow(a,b) {
    let c;
    if (!Number.isInteger(+b)) {
        if (+a < 0) {
            a = (-a) ** (b);
           return -a;
        } else {
            return a ** (b);
        }
    }
    c = a;
    if ((+b) < 0) {
        while (++b && isFinite(+c)) c *= a;
        return 1.0 / c;
    }
    while (--b && isFinite(+c)) c *= a;
    return c;
}
//module.exports = pow;

function sqrt(a,b) {
    if ((a < 0 && +b % 2 === 0) || b === '0') {
        return;
    }
    if (+b === 2) a = doubleSqrt(a);
    else {
        if (+a < 0) {
            a = (-a) ** (1.0 / b);
            a = -a;
        } else {
            a = a ** (1.0 / b);
        }
    }
    return a;
}
//module.exports = sqrt;

function pow10x(b) {
    if (+b === 0) {
        return 1;
    }
    let a = 10;
    let c = a;
    if ((+b) < 0) {
        while (++b && isFinite(+c)) c *= a;
        return 1 / c;
    }
    while (--b && isFinite(+c)) c *= a;
    return c;
}
//module.exports = pow10x;

function doubleSqrt(number) {
    let t;
    let squareRoot = number / 2;
    do {
        t = squareRoot;
        squareRoot = (t + (number / t)) / 2;
    } while ((t - squareRoot) !== 0);
    return squareRoot;
}

function fact(n) {
    if (n < 0 || !Number.isInteger(n)) return 0;
    if (n === 0 || n === 1) return 1;
    if (n > 1) return n * fact(n - 1);
}
module.exports = fact;
