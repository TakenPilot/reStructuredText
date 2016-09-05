import whitespace from './whitespace';
import blockService from './block';
import sectionService from './section';

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

function getDefinition(sections, index, lines) {
  const section = sections[index],
    startIndex = section.start,
    block = blockService.getBlock(lines, startIndex + 1);

  sectionService.applySectionTypes(block.sections, lines);

  block.sections.unshift({start: startIndex, end: startIndex, length: 1, indent: section.indent, type: 'text'});

  return {type: 'definition', sections: block.sections};
}

function getHTML(sections, index, lines) {
  const content = escapeHtml(_.slice(lines, sections[index].start, sections[index].end + 1).join(''));

  return `<p class="${className}">${content}</p>`;
}

export default {
  isDefinition,
  getDefinition,
  getHTML
}
