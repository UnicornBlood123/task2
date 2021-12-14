const fact = require('./math.js');

test('fact 5to equal 12', () => {
    expect(fact(5)).toBe(120);
});