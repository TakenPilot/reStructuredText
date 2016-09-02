import whitespace from './whitespace';

function getSections(lines) {
  console.log('document', 'lines', lines);
  // divide up document into sections based on blank lines
  const sections = [];
  let index = 0,
    lastContentLineIndex = -1,
    lastBlankLineIndex = -1;

  while (index < lines.length) {
    console.log('document', 'lines[index]', lines[index]);
    lines[index] = whitespace.trimRight(lines[index]);
    const line = lines[index],
      len = line.length;

    if (len === 0) {
      if (lastContentLineIndex > -1 && lastBlankLineIndex !== index - 1) {
        // it's the end of a section!
        sections.push({
          start: lastBlankLineIndex + 1,
          end: index,
          indent: whitespace.countLeadingSpaces(lines[lastBlankLineIndex + 1])
        });
      }
      lastBlankLineIndex = index;
    } else {
      lastContentLineIndex = index;
    }
    index++;
  }

  return sections;
}

export default {
  getSections
}
