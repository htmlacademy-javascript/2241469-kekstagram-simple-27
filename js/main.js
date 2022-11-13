import {createData} from './data.js';
import {renderPictures} from './view-image.js';
//work-with-form.js модуль для работы с формой
import {addEventsForForm} from './work-with-form.js';

//подготавливаем данные
const prepareData = Array.from({length: 25}, createData);
//ренедерим картинки
renderPictures(prepareData);
addEventsForForm();
