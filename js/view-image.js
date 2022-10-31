import {similarWizards} from './data.js';
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');


function createPicture(data) {
  const {comment, description, likes, url} = data;
  const picture = imageTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comment;
  picture.querySelector('.picture__likes').textContent = likes;

  return picture;
}


function renderPictures(pictures){

  const fragment = document.createDocumentFragment();

  for(let i = 0;i < pictures.length;i++)
  {
    const pictElement = createPicture(pictures[i]);
    fragment.append(pictElement);
  }

  container.append(fragment);

}
renderPictures(similarWizards);
