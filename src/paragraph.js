import _ from 'lodash';

const className = 'rst-paragraph';

function getHTML(sections, index, lines) {
  const content = _.slice(lines, sections[index].start, sections[index].end + 1).join('');

  return `<p class="${className}">${content}</p>`;
}

export default {
  getHTML
}
