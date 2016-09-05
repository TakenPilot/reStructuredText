import _ from 'lodash';
import whitespace from './whitespace';
import sectionService from './section';

function getBlock(lines, index) {
  const indent = whitespace.countLeadingSpaces(lines[index]),
    sections = [];
  let start = index;

  index = start;

  let startingIndent = indent,
    sectionStart = index,
    lastContentLineIndex = -1,
    lastBlankLineIndex = -1;

  while (index < lines.length && startingIndent >= indent) {
    const line = lines[index],
      len = line.length;

    if (len === 0) {
      lastBlankLineIndex = index;
    } else {
      // if there is content after a blank line with the same indent as the start of the block, it's a new section
      if (lastBlankLineIndex === index - 1) {
        startingIndent = whitespace.countLeadingSpaces(lines[index]);

        if (sectionStart !== index && (startingIndent === indent || startingIndent < indent)) {
          // we just left a distinct section, or we're done collecting sections
          sections.push({
            start: sectionStart,
            end: lastContentLineIndex,
            length: (lastContentLineIndex - sectionStart) + 1,
            indent
          });
          sectionStart = index;
        }
      }

      lastContentLineIndex = index;
    }
    index++;
  }

  // if we didn't end because of indenting, add the last bit
  if (startingIndent >= indent) {
    sections.push({
      start: sectionStart,
      end: lastContentLineIndex,
      length: (lastContentLineIndex - sectionStart) + 1,
      indent
    });
  }

  return {
    sections,
    start,
    end: lastContentLineIndex,
    length: (lastContentLineIndex - start) + 1,
    indent
  }
}

export default {
  getBlock
}
