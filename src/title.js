import _ from 'lodash';
import whitespace from './whitespace';
import escapeHtml from 'escape-html';

const className = 'rst-title';

function isTwoLineTitle(sections, index, lines) {
  const section = sections[index];

  if (section.length === 2) {
    const titleLine = lines[section.start],
      lastLine = lines[section.end];

    return whitespace.isAdornment(lastLine[0]) &&
      titleLine.length === lastLine.length &&
      whitespace.repeatsFor(lastLine, 0, lastLine.length);
  }
}

function isThreeLineTitle(sections, index, lines) {
  const section = sections[index];

  if (section.length === 3) {
    const firstLine = lines[section.start],
      titleLine = lines[section.end - 1],
      lastLine = lines[section.end];

    return whitespace.isAdornment(lastLine[0]) &&
      firstLine.length === lastLine.length &&
      titleLine.length <= lastLine.length &&
      whitespace.repeatsFor(firstLine, 0, firstLine.length) &&
      whitespace.repeatsFor(lastLine, 0, lastLine.length);
  }
}

function isTitle(sections, index, lines) {
  return isTwoLineTitle(sections, index, lines) || isThreeLineTitle(sections, index, lines);
}

/**
 * @param {Array} sections
 * @param {number} [index=sections.length]
 * @param {[string]} lines
 * @returns {{token: string, count: number}}}
 */
function getLevels(sections, index, lines) {
  index = index !== undefined ? index : sections.length;
  const levels = [];

  for (let i = 0; i < index; i++) {
    const cursor = sections[i];

    if (cursor.type === 'title') {
      let tokenIndex,
        token = getStyleToken(cursor, lines);

      tokenIndex = _.findIndex(levels, {token});
      if (tokenIndex === -1) {
        levels.push({token, count: 1});
      } else {
        levels[tokenIndex].count++;
      }
    }
  }

  return levels;
}

function getStyleToken(section, lines) {
  const adornmentCharacter = lines[section.end][0];
  let token = adornmentCharacter;

  if (lines[section.start][0] === adornmentCharacter) {
    token += 'o';
  }

  return token;
}

function getHTML(sections, index, lines) {
  // we know that title elements are at least two lines
  const section = sections[index],
    titles = [],
    level = _.findIndex(getLevels(sections, index + 1, lines), {token: getStyleToken(section, lines)}) + 1,
    classNameLevel = className + '-' + level;
  let content;

  for (let i = 0; i < section.length; i++) {
    const line = lines[section.end - i];

    if (!whitespace.repeatsFor(line, 0, line.length)) {
      titles.unshift(line.trim());
    }
  }

  content = escapeHtml(titles.join(' '));

  return `<h2 class="${classNameLevel}">${content}</h2>`;
}

export default {
  getHTML,
  isTitle,
  getLevels
}
