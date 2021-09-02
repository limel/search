import './styles.css';
import textTemplate from './template/textTemplate.hbs';
import debounce from 'lodash.debounce';
import searchService from './js/search-servies';

let originalText;

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
    .then(text => {
      renderText(text);
      originalText = refs.textOutput.querySelector('p').innerHTML;
    });
}
function search(e) {
  const query = e.target.value;
  const selector = refs.textOutput.querySelector('p');
  if (query.length !== 0 && query !== ' ') {
    searchService.searchMatch(originalText, query, selector);
    const marks = document.querySelectorAll('[data-mark="true"]');
    searchService.numberMatches(marks);
    return;
  }
  searchService.reset(originalText, selector);
}

document.addEventListener('load', fetchText());
refs.searchInput.addEventListener('input', debounce(search, 500));
