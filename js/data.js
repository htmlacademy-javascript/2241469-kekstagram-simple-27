import {getRandomIntNumber} from './util.js';
const createWizard = () => ({
  id: getRandomIntNumber(1,25),
  url: `photos/${getRandomIntNumber(1,25)}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomIntNumber(15,200),
  comments: getRandomIntNumber(0,200)
});

const similarWizards = Array.from({length: 25}, createWizard);
