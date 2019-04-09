const { Mod10, createString, findNonce } = require('../src/functions');
const data = require('./data.test.json');
const string =
  '000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGTMiningCorporationBobPIKAB11548689513858154874778871610312';

const newString = 'CMGTMiningCorporationBasBOOTB115487477332611548748101396';
const newHash =
  '00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf';

describe('Mod10 test', () => {
  test('Mod10 1.0', () => {
    expect(Mod10(string)).toBe(
      '00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf'
    );
  });
  test('Mod10 2.0', () => {
    expect(Mod10(createString(data))).toBe(
      '00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf'
    );
  });
});
