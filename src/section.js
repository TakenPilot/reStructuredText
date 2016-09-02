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

        const result = isDotDot && (line.length === 2 || whitespace.isWhitespace(line[2]));

        console.log('dotdot', line, {result});

        return result;
      },
      then: (lines, index) => rules.first(dotDotLineTypes, lines, index)
    },
    {
      when: (lines, index) => whitespace.isAdornment(lines[index].trim()[0]),
      then: (lines, index) => rules.first(adornmentLineTypes, lines, index)
    }
  ],
  sectionTypes = [
    {
      when: (sections, index, lines) => {
        const section = sections[index];

        if (section.length === 2) {
          const titleLine = lines[section.start],
            lastLine = lines[section.end];

          return whitespace.isAdornment(lastLine[0]) &&
            titleLine.length === lastLine.length &&
            whitespace.repeatsFor(lastLine, 0, lastLine.length);
        } else if (section.length === 3) {
          const firstLine = lines[section.start],
            titleLine = lines[section.end - 1],
            lastLine = lines[section.end];

          return whitespace.isAdornment(lastLine[0]) &&
            firstLine.length === lastLine.length &&
            titleLine.length <= lastLine.length &&
            whitespace.repeatsFor(firstLine, 0, firstLine.length) &&
            whitespace.repeatsFor(lastLine, 0, lastLine.length);
        }
      },
      then: 'title'
    },
    {
      when: (sections, index, lines) => {
        if (sections[index].length !== 1) {
          return false;
        }

        const line = lines[sections[index].start];

        return whitespace.repeatsFor(line, 0, line.length) && line.length >= 4;
      },
      then: 'transition'
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

function getTypeBySection(sections, index, lines) {
  return rules.first(sectionTypes, sections, index, lines);
}

export default {
  getTypeByLine,
  getTypeBySection
}
