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

function replaceSectionLiteralMarker(section, lines, tombstoneList) {
  const lastLine = lines[section.end];

  if (section.length === 1 && lastLine.length == 2) {
    //just delete the last section
    tombstoneList.push(a - 1);
  } else if (lastLine[lastLine - 3] === ' ') {
    // if they have whitespace before the colons, remove the colons and whitespace
    lines[section.end] = lastLine.substr(0, lastLine - 3);
  } else {
    // else, leave a single colon
    lines[section.end] = lastLine.substr(0, lastLine - 1);
  }
}

function getHTML(sections, index, lines) {
  const section  = sections[index],
    // strip indent from all lines
    content = escapeHtml(_.map(_.slice(lines, section.start, section.end + 1), line => line.substr(section.indent)).join(''));

  return `<p class="${className}">${content}</p>`;
}

export default {
  isContinuedLiteralBlock,
  isNewLiteralBlock,
  getHTML,
  replaceSectionLiteralMarker
}
