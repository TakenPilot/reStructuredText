import _ from 'lodash';
import whitespace from './whitespace';
import sectionService from './section';
import literalBlockService from './literal-block';
import titleService from './title';
import paragraphService from './paragraph';
import transitionService from './transition';
import blockService from './block';

function normalizeLine(lines, index) {
  lines[index] = whitespace
  // no whitespace matters to the right of the characters
    .trimRight(lines[index])
    // no tabs are allows, indentation is always three spaces
    .replace('\t', '   ');
}

function applySectionAlterations(sections, lines) {
  const tombstoneList = [];

  for (let a = 0; a < sections.length; a++) {
    const type = sections[a].type,
      alter = type && type.alter;

    if (_.isArray(alter)) {
      for (let j = 0; j < alter.length; j++) {
        switch (alter[j]) {
          case 'replacePreviousSectionLiteralMarker':
            literalBlockService.replaceSectionLiteralMarker(sections[a - 1], lines, tombstoneList);
            break;
          default:
            break;
        }
      }

      // alter complete; set as normal type
      sections[a].type = type.type;
    }
  }

  _.pullAt(tombstoneList);
}

function getStructure(lines) {
  for (let i = 0; i < lines.length; i++) {
    normalizeLine(lines, i);
  }

  const start = whitespace.getFirstNonBlankLineIndex(lines, 0),
    block = blockService.getBlock(lines, start);

  sectionService.applySectionTypes(block.sections, lines);

  return block;
}

function getHTML(structure, lines) {
  const sections = structure.sections,
    types = {
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
  getStructure
}
