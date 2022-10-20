import PropTypes from 'prop-types';

const API_KEY = '29842496-3845217212e1068d319854a8f';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImg(name, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&page=${page}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Нет изображения с именем ${name}`));
  });
}

const api = {
  fetchImg,
};

fetchImg.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default api;

