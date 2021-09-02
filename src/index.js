import './styles.css';

import textTemplate from './template/textTemplate.hbs';
import debounce from 'lodash.debounce';
import Mark from 'mark.js';

const url = 'https://baconipsum.com/api/?type=meat-and-filler';

const refs = {
  textOutput: document.querySelector('[data-action="output"]'),
  searchInput: document.querySelector('[data-action=search]'),
};

function renderText(inputData) {
  const markup = textTemplate(inputData);
  refs.textOutput.insertAdjacentHTML('beforeend', markup);
}

function fetchText() {
  fetch(url)
    .then(response => response.json())
    .then(renderText);
}

function search(e) {
  const markInstance = new Mark(document.getElementById('article')); // вынести из функции
  const query = e.target.value;
  const options = {};
  markInstance.unmark({
    done: function () {
      markInstance.mark(query, options);
    },
  });

  const marks = document.querySelectorAll('[data-markjs="true"]');
  const marksArray = Object.values(marks);
  console.log(marksArray);

  for (let index = 0; index < marksArray.length; index++) {
    const element = marksArray[index];
    element.setAttribute('data-index', index + 1);
  }
}

document.addEventListener('load', fetchText());
refs.searchInput.addEventListener('input', debounce(search, 500));
