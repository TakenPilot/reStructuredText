import whitespace from './whitespace';

const className = 'rst-line-block';

function isLineBlock(sections, index, lines) {
  const line = lines[sections[index].start];
  let firstNonSpaceIndex;

  if (line.length <= 2) {
    return false;
  }

  firstNonSpaceIndex = whitespace.getFirstNonSpaceIndex(line);

  return line.substr(firstNonSpaceIndex, 2) === '| ';
}

function getHTML(sections, index, lines) {
  const content = escapeHtml(_.slice(lines, sections[index].start, sections[index].end + 1).join(''));

  return `<p class="${className}">${content}</p>`;
}

export default {
  isLineBlock,
  getHTML
}
