import _ from 'lodash';
import escapeHtml from 'escape-html';

const className = 'rst-paragraph';

function getHTML(sections, index, lines) {
  const content = escapeHtml(_.slice(lines, sections[index].start, sections[index].end + 1).join(''));

  return `<p class="${className}">${content}</p>`;
}

export default {
  getHTML
}
