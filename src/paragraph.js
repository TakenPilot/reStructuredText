import _ from 'lodash';
import escapeHtml from 'escape-html';
import blockService from './block';
import literalBlockService from './literal-block';
import whitespace from './whitespace';

const className = 'rst-paragraph';

function getParagraph(sections, index, lines) {
  const section = sections[index],
    lastLineWithIndentIndex = whitespace.getLastLineWithIndentIndex(lines, section.indent, section.start, section.start + section.length);

  if (lastLineWithIndentIndex !== section.end && _.endsWith(lines[lastLineWithIndentIndex], '::')) {
    // then there is a literal block here

    const blockStart = whitespace.getFirstNonBlankLineIndex(lines, lastLineWithIndentIndex + 1, section.start + section.length);

    if (blockStart > -1) {
      const block = blockService.getBlock(lines, blockStart);

      _.each(block.sections, section => {
        section.type = 'literalBlock';
      });

      block.sections.unshift({
        start: section.start,
        end: lastLineWithIndentIndex,
        indent: section.indent,
        length: (lastLineWithIndentIndex - section.start) + 1,
        type: 'text'
      });

      literalBlockService.replaceSectionLiteralMarker(lines, lastLineWithIndentIndex);

      if (lines[lastLineWithIndentIndex].length === 0) {
        return {type: null, sections: block.sections};
      }

      return {type: 'paragraph', sections: block.sections};
    }
  }

  return 'paragraph';
}

function getContent(sections, index, lines) {
  return escapeHtml(_.slice(lines, sections[index].start, sections[index].end + 1).join(' '))
}

function getText(sections, index, lines) {
  return `<span>${getContent(sections, index, lines)}</span>`;
}

function getHTML(sections, index, lines) {
  const section = sections[index],
    types = {
      'text': getText,
      'literalBlock': literalBlockService.getHTML
    };
  let content;

  if (section.sections) {
    content = _.map(section.sections, (childSection, childIndex) => {
      return _.isFunction(types[childSection.type]) ? types[childSection.type](section.sections, childIndex, lines): '';
    }).join('');
  } else {
    content = getContent(sections, index, lines);
  }

  return `<p class="${className}">${content}</p>`
}

export default {
  getHTML,
  getParagraph
}
