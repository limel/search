export default {
  searchMatch(originalText, searchQuery, selector) {
    const regex = new RegExp(searchQuery, 'gi');
    const text = originalText;
    const newText = text.replace(
      regex,
      '<mark class="highlight" data-mark="true">$&</mark>',
    );
    selector.innerHTML = newText;
  },
  numberMatches(selectors) {
    const array = Object.values(selectors);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      element.setAttribute('data-index', index + 1);
    }
  },
  reset(originalText, selector) {
    selector.innerHTML = originalText;
  },
};
