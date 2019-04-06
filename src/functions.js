const sha256 = require('sha256');

createString = newBlock => {
  const { hash, data, nonce, timestamp } = newBlock.blockchain;
  const from = data[0].from;
  const to = data[0].to;
  const amount = data[0].amount;
  const dataTimestamp = data[0].timestamp;

  const string = removeWhitespaces(
    `${hash}${from}${to}${amount}${dataTimestamp}${timestamp}${nonce}`
  );
  return string;
};

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
  } else return array;
};

splitArray = array => {
  const chunk = 10;
  let i = 0;
  let newArray = [];

  for (i < array.length; i < array.length; i += chunk) {
    const tempArray = array.slice(i, i + chunk);
    newArray.push(tempArray);
  }
  return newArray;
};

calculateArrayBlocks = (array, calculatedArray = []) => {
  if (!array.length) {
    return [...calculatedArray];
  }
  if (!calculatedArray.length) {
    if (array.length === 1) {
      return array;
    }
    calculatedArray = [...array.shift()];
  }
  const nextArray = [...array.shift()];

  const addedArrays = calculatedArray.map(
    (number, i) => (parseInt(number, 10) + parseInt(nextArray[i], 10)) % 10
  );

  return calculateArrayBlocks(array, addedArrays);
};

Mod10 = hash => {
  // 1. text to unicode (ASCII)
  const unicodeString = convertLetterToNumber(hash);
  // 2. split numbers and put in array
  const array = splitStringToArray(unicodeString);
  const filledArray = fillArray(array);
  // 2.1 make array of arrays
  const splittedArray = splitArray(filledArray);
  // 3. Take 2 blocks from the array
  // 4. add these blocks
  // 5. use these 10 numbers the same way as 4. with the last 10 numbers from 3.
  // 6. repeat 5. until all numbers have been
  const newCode = calculateArrayBlocks(splittedArray);
  // 7. toString
  const newCodeString = newCode.join('');
  // 8. sha257
  const hashedString = sha256(newCodeString);
  return hashedString;
};

module.exports = {
  Mod10,
  createString
};
