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


function checkStringLen(str,maxLen){
  return str.length <= maxLen;
}


const createWizard = () => ({
  id: getRandomIntNumber(1,25),
  url: `photos/${getRandomIntNumber(1,25)}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomIntNumber(15,200),
  comments: getRandomIntNumber(0,200)
});

const similarWizards = Array.from({length: 25}, createWizard);

console.log(similarWizards);
