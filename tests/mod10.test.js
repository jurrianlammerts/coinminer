require('../src/functions');
const functions = require('../src/functions');
const data = require('./data.json');
const { lastBlock } = require('./api');

describe('Mod10 test', () => {
  test('Mod10', () => {
    expect(functions.Mod10(data)).toBe(
      '000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8 CMGT Mining Corporation Bob PIKAB 1 1548689513858 1548747788716 10312'
    );
  });
});
