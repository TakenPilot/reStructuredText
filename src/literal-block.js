import _ from 'lodash';
import escapeHtml from 'escape-html';

const className = 'rst-literal-block';

function isNewLiteralBlock(sections, index, lines) {
  return index > 0 &&
    _.endsWith(lines[sections[index - 1].end], '::') &&
    sections[index - 1].indent < sections[index].indent;
}

function isContinuedLiteralBlock(sections, index, lines) {
  return index > 0 &&
    sections[index].indent > 0 &&
    sections[index - 1].indent === sections[index].indent &&
    (isNewLiteralBlock(sections, index - 1, lines) || isContinuedLiteralBlock(sections, index - 1, lines))
}

function replaceSectionLiteralMarker(lines, index) {
  const line = lines[index];

  if (line.length == 2) {
    //just delete the whole thing
    lines[index] = '';
  } else if (line[line.length - 3] === ' ') {
    // if they have whitespace before the colons, remove the colons and whitespace
    lines[index] = line.substr(0, line.length - 3);
  } else {
    // else, leave a single colon
    lines[index] = line.substr(0, line.length - 1);
  }
}

function getHTML(sections, index, lines) {
  const section  = sections[index],
    // strip indent from all lines
    content = escapeHtml(_.map(_.slice(lines, section.start, section.end + 1), line => line.substr(section.indent)).join('\n'));

  return `<p class="${className}">${content}</p>`;
}

export default {
  isContinuedLiteralBlock,
  isNewLiteralBlock,
  getHTML,
  replaceSectionLiteralMarker
}
