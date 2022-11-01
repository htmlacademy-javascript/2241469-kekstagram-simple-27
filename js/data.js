import {getRandomIntNumber} from './util.js';
function createData() {

  return {
    id: getRandomIntNumber(1,25),
    url: `photos/${getRandomIntNumber(1,25)}.jpg`,
    description: 'Описание фотографии',
    likes: getRandomIntNumber(15,200),
    comments: getRandomIntNumber(0,200)
  };


}


export {createData};
