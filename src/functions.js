const sha256 = require('sha256');

const createString = newBlock => {
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

const createStringWithoutNonce = (newBlock, hash) => {
  const { from, to, amount, timestamp } = newBlock.transactions[0];
  const timestampOld = newBlock.timestamp;

  const newString = removeWhitespaces(
    `${hash}${from}${to}${amount}${timestamp}${timestampOld}`
  );
  return newString;
};

const convertLetterToNumber = string => {
  let result = '';
  string
    .toString()
    .split('')
    .forEach(c => {
      if (isNaN(c)) {
        result += c.charCodeAt(0);
      } else {
        result += c;
      }
    });
  return result;
};

const splitStringToArray = string => {
  return string.split('');
};

const removeWhitespaces = string => {
  return string.replace(/\s/g, '');
};

const toNumber = string => {
  return parseInt(string, 10);
};

const fillArray = array => {
  if (array.length % 10 != 0) {
    for (let i = 0; i < array.length % 10; i += 1) {
      array.push(i.toString());
    }
    return array;
  } else return array;
};

const splitArray = array => {
  const chunk = 10;
  let i = 0;
  let newArray = [];

  for (i < array.length; i < array.length; i += chunk) {
    const tempArray = array.slice(i, i + chunk);
    newArray.push(tempArray);
  }
  return newArray;
};

const calculateArrayBlocks = (array, calculatedArray = []) => {
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

const checkHash = hash => {
  return hash.slice(0, 4) === '0000';
};

const waitASec = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};

const findNonce = async (hash, nonce = -1, delay = 3000) => {
  const finalHash = Mod10(`${hash}${nonce.toString()}`);
  console.log(finalHash, nonce);

  if (checkHash(finalHash)) {
    console.log(`Done, this is the nonce: ${nonce}`);
    return nonce;
  }

  const newNonce = nonce + 1;
  let countDown = delay - 1;

  if (countDown === 0) {
    countDown = 3000;
    await waitASec(10);
  }

  return findNonce(hash, newNonce, countDown);
};

const postBlock = block => {};

const Mod10 = data => {
  // Text to unicode (ASCII)
  const unicodeString = convertLetterToNumber(data);
  // Split numbers and put in array
  const array = splitStringToArray(unicodeString);
  const filledArray = fillArray(array);
  // Make array of arrays
  const splittedArray = splitArray(filledArray);
  // Make 2 blocks of 10
  // The first number is taken from both blocks
  // these are added together
  // Modulus 10 is taken from the result
  // This is done 10 times for all numbers from both blocks of 10 numbers.
  // This produces a new set of 10 numbers
  // Repeat this until 10 numbers remain
  const newCode = calculateArrayBlocks(splittedArray);
  // Make a new string
  const newCodeString = newCode.join('');
  // Hash new string
  const hashedString = sha256(newCodeString);
  return hashedString;
};

module.exports = {
  Mod10,
  createString,
  findNonce,
  createStringWithoutNonce
};
