import whitespace from './whitespace';
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
      when: '- ',
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
      when: '.. ',
      fn: (lines, index) => rules.first(dotDotLineTypes, lines, index)
    },
    {
      when: (lines, index) => whitespace.isAdornment(lines[index][0]),
      then: (lines, index) => rules.first(adornmentLineTypes)
    }
  ],
  sectionTypes = [
    {
      when: {},
      then: 'literalBlock'
    },
    {
      when: {},
      then: 'blockQuote'
    },
    {
      when: {},
      then: 'gridTable'
    },
    {
      when: {},
      then: 'simpleTable'
    },
    {
      when: true,
      then: 'paragraph'
    }
  ];

function getTypeByLine(lines, index) {
  return rules.first(twoTokenLineTypes, lines, index);
}

function getTypeBySection(sections, index) {
  return rules.first(sectionTypes, sections, index);
}

export default {
  getTypeByLine,
  getTypeBySection
}
