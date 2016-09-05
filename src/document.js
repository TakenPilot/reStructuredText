import _ from 'lodash';
import whitespace from './whitespace';
import sectionService from './section';
import literalBlockService from './literal-block';
import titleService from './title';
import paragraphService from './paragraph';
import transitionService from './transition';

function applySectionTypes(sections, lines) {
  for (let i = 0; i < sections.length; i++) {
    const type = sectionService.getTypeByLine(lines, sections[i].start) ||
      sectionService.getTypeBySection(sections, i, lines);

    if (type) {
      sections[i].type = type;
    }
  }
}

function normalizeLine(lines, index) {
  lines[index] = whitespace
  // no whitespace matters to the right of the characters
    .trimRight(lines[index])
    // no tabs are allows, indentation is always three spaces
    .replace('\t', '   ');
}

function getSections(lines) {
  // divide up document into sections based on blank lines
  const sections = [];
  let index = 0,
    lastContentLineIndex = -1,
    lastBlankLineIndex = -1;

  while (index < lines.length) {
    normalizeLine(lines, index);
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

function applySectionAlterations(sections, lines) {
  const tombstoneList = [];

  for(let a = 0; a < sections.length; a++) {
    const type = sections[a].type,
      alter = type && type.alter;

    if (_.isArray(alter)) {
      for (let j = 0; j < alter.length; j++) {
        switch (alter[j]) {
          case 'replacePreviousSectionLiteralMarker':
            literalBlockService.replaceSectionLiteralMarker(sections[a - 1], lines, tombstoneList);
            break;
          default: break;
        }
      }

      // alter complete; set as normal type
      sections[a].type = type.type;
    }
  }

  _.pullAt(tombstoneList);
}

function getHTML(sections, lines) {
  const types = {
    paragraph: index => paragraphService.getHTML(sections, index, lines),
    literalBlock: index => literalBlockService.getHTML(sections, index, lines),
    title: index => titleService.getHTML(sections, index, lines),
    transition: index => transitionService.getHTML(sections, index, lines)
  };

  return _.map(sections, (section, index) => {
    return _.isFunction(types[section.type]) ? types[section.type](index) : '';
  }).join('');
}

export default {
  applySectionAlterations,
  getHTML,
  getSections
}
