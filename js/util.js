function getRandomIntNumber(startRange, endRange) {
  if(startRange < 0 || endRange < 0) {
    return NaN;
  }

  if(startRange >= endRange) {
    return NaN;
  }

  const lower = Math.ceil(startRange);
  const upper = Math.floor(endRange);
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkLimited(currentValue, min, max) {
  if (currentValue < min) {
    return min;
  }
  if (currentValue > max) {
    return max;
  }
  return currentValue;
}

function checkStringLen(str,maxLen){
  return str.length <= maxLen;
}

export {getRandomIntNumber,checkStringLen,checkLimited};
