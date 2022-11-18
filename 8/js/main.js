import {getDataFromServer} from './data.js';
import {renderPictures} from './view-image.js';

//work-with-form.js модуль для работы с формой
import {addEventsForForm} from './work-with-form.js';
import {initScaleControlls} from './edit-image.js';


//подготавливаем данные
getDataFromServer(renderPictures);

//работа с формой
addEventsForForm();
//редактирование изображений
initScaleControlls();
