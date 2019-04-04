convertLetterToNumber = string => {
  let result = '';
  string.split('').forEach(c => {
    if (isNaN(c)) {
      result += c.charCodeAt(0);
    } else {
      result += c;
    }
  });
  return result;
};

splitStringToArray = string => {
  return string.split('');
};

removeWhitespaces = string => {
  return string.replace(/\s/g, '');
};

toNumber = string => {
  return parseInt(string, 10);
};

fillArray = array => {
  if (array.length % 10 != 0) {
    for (i = 0; i < array.length % 10; i++) {
      array.push(i.toString());
    }
    return array;
  } else return;
};

recursion = (a, b) => {
  let newBlock = [];
  for (i = 0; i < a.length; i++) {
    let first = toNumber(a.slice(i, i + 1));
    let second = toNumber(b.slice(i, i + 1));
    let addedNumbers = first + second;
    let result = addedNumbers % 10;
    newBlock.push(result);
  }
  return newBlock;
};

Mod10 = hash => {
  // 1. text to unicode (ASCII)
  const unicodeString = convertLetterToNumber(hash);

  // 2. split numbers and put in array
  const array = splitStringToArray(unicodeString);
  const filledArray = fillArray(array);

  // 3. get the first two blocks of 10 numbers
  const firstTen = array.slice(0, 10);
  const secondTen = array.slice(11, 21);

  // console.log(firstTen);
  // console.log(secondTen);

  // 4. add these blocks
  const result = recursion(firstTen, secondTen);
  // 5. use these 10 numbers the same way as 4. with the last 10 numbers from 3.
  for(i = 0; i < filledArray.length; i + 10) {
    
  }
  // 6. repeat 5. until all numbers have been
  // 7. toString(result)
  // 8. sha257(7. result)

  // !!! if block hasn't has 10 numbers add with 0,1,2,3,4,5,6,7,8,9
};

module.exports = {
  Mod10
};
