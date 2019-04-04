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
    for (let i = 0; i < array.length % 10; i += 1) {
      array.push(i.toString());
    }
    return array;
  } else return;
};

splitArray = array => {
  const chunk = 10;
  let i = 0;
  let newArray = [];
  for (i < array.length; i < array.length; i += chunk) {
    const tempArray = array.slice(i, i + chunk);
    // console.log(tempArray);
    newArray.push(tempArray);
  }
  console.log(newArray);
};

recursion = (a, b) => {
  let newBlock = [];
  for (let i = 0; i < a.length; i += 1) {
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

  // 2.1 make array of arrays
  const splittedArray = splitArray(filledArray);

  // 4. add these blocks
  const result = recursion(firstTen, secondTen);
  // 5. use these 10 numbers the same way as 4. with the last 10 numbers from 3.
  // for (i = 0; i < filledArray.length; i + 10) {}
  // 6. repeat 5. until all numbers have been
  // 7. toString(result)
  // 8. sha257(7. result)

  // !!! if block hasn't has 10 numbers add with 0,1,2,3,4,5,6,7,8,9
};

module.exports = {
  Mod10
};
