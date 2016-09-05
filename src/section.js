import _ from 'lodash';
import whitespace from './whitespace';
import titleService from './title';
import lineBlockService from './line-block';
import literalBlockService from './literal-block';
import transitionService from './transition';
import paragraphService from './paragraph';
import blockService from './block';
import rules from 'rulejs';

const dotDotLineTypes = [
    {
      when: (lines, index) => lines[index][4] === '|',
      then: 'substitutionDirective'
    },
    {
      when: (lines, index) => lines[index][4] === '[',
      then: 'footnote'
    },
    {
      when: (lines, index) => lines[index][4] === '_',
      then: 'hyperlinkTarget'
    },
    {
      when: (lines, index) => lines[index].match(/::/),
      then: 'directive'
    },
    {
      when: true,
      then: 'comments'
    },
  ],
  adornmentLineTypes = [
    {
      when: (lines, index) => {
        if (lines[index].length < 3) {
          return false;
        }

        const line = lines[index].trim();

        return whitespace.isBullet(line[0]) && whitespace.isWhitespace(line[1]);
      },
      then: 'bulletList'
    },
    {
      when: /^\d\. /,
      then: 'enumeratedList'
    },
    {
      when: /^[a-zA-Z]+$/,
      then: 'definitionList'
    },
    {
      when: /^:[a-zA-Z]+: .+$/,
      then: 'fieldList'
    }
  ],
  twoTokenLineTypes = [
    {
      when: (lines, index) => {
        const line = lines[index],
          isDotDot = line.substr(0, 2) === '..';

        return isDotDot && (line.length === 2 || whitespace.isWhitespace(line[2]));
      },
      then: (lines, index) => rules.first(dotDotLineTypes, lines, index)
    },
    {
      when: (lines, index) => whitespace.isAdornment(lines[index].trim()[0]),
      then: (lines, index) => rules.first(adornmentLineTypes, lines, index)
    }
  ],
  sectionTypes = [
    {when: lineBlockService.isLineBlock, then: 'lineBlock'},
    {when: titleService.isTitle, then: 'title'},
    {when: transitionService.isTransition, then: 'transition'},
    {when: {}, then: 'blockQuote'},
    {when: {}, then: 'gridTable'},
    {when: {}, then: 'simpleTable'},
    {when: true, then: paragraphService.getParagraph}
  ];

function getTypeByLine(lines, index) {
  return rules.first(twoTokenLineTypes, lines, index);
}

function getTypeBySection(sections, index, lines) {
  return rules.first(sectionTypes, sections, index, lines);
}

function applySectionTypes(sections, lines) {
  for (let i = 0; i < sections.length; i++) {
    const type = getTypeByLine(lines, sections[i].start) ||
      getTypeBySection(sections, i, lines);

    if (_.isString(type)) {
      sections[i].type = type;
    } else if (_.isPlainObject(type)) {
      _.assign(sections[i], type);
    }
  }
}

export default {
  getTypeByLine,
  getTypeBySection,
  applySectionTypes
}
