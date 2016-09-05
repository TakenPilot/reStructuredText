import whitespace from './whitespace';

const className = 'rst-definition';

/**
 * A line directly followed by an indented line
 * @param sections
 * @param index
 * @param lines
 * @returns {boolean}
 */
function isDefinition(sections, index, lines) {
  // definitions are at least two lines long
  if (sections[index].length < 2) {
    return false;
  }

  const firstLineStartIndex = whitespace.getFirstNonSpaceIndex(lines[sections[index].start]),
    secondLineStartIndex = whitespace.getFirstNonSpaceIndex(lines[sections[index].start + 1]);

  return firstLineStartIndex < secondLineStartIndex;
}

function getHTML(sections, index, lines) {
  const content = escapeHtml(_.slice(lines, sections[index].start, sections[index].end + 1).join(''));

  return `<p class="${className}">${content}</p>`;
}

export default {
  isDefinition,
  getHTML
}
