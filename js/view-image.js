const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');


function createPicture(data) {
  const {comments, description, likes, url} = data;
  const picture = imageTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments;
  picture.querySelector('.picture__likes').textContent = likes;
  return picture;
}
function renderPictures(pictures){
  const fragment = document.createDocumentFragment();
  pictures.forEach((element) =>fragment.append(createPicture(element)));
  container.append(fragment);
}

export {renderPictures};


