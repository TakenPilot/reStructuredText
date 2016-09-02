import _ from 'lodash';
import whitespace from './whitespace';
import sectionService from './section'

function applySectionTypes(sections, lines) {
  for (let i = 0; i < sections.length; i++) {
    const type = sectionService.getTypeByLine(lines, sections[i].start) ||
      sectionService.getTypeBySection(sections, i, lines);

    if (type) {
      sections[i].type = type;
    }
  }
}

function getSections(lines) {
  // divide up document into sections based on blank lines
  const sections = [];
  let index = 0,
    lastContentLineIndex = -1,
    lastBlankLineIndex = -1;

  while (index < lines.length) {
    console.log('document', 'lines[index]', lines[index]);
    lines[index] = whitespace.trimRight(lines[index]);
    console.log('document', 'lines[index]', 'afterTrim', lines[index]);
    const line = lines[index],
      len = line.length;

    if (len === 0) {
      if (lastContentLineIndex > -1 && lastBlankLineIndex !== index - 1) {
        // it's the end of a section!
        sections.push({
          start: lastBlankLineIndex + 1,
          end: index - 1,
          length: index - lastBlankLineIndex - 1,
          indent: whitespace.countLeadingSpaces(lines[lastBlankLineIndex + 1])
        });
      }
      lastBlankLineIndex = index;
    } else {
      lastContentLineIndex = index;
    }
    index++;
  }

  applySectionTypes(sections, lines);

  return sections;
}

export default {
  getSections
}
