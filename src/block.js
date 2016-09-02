function countLeadingSpaces(str) {
  for (var i = 0; i < str.length; i++) {
    if (str[i] != " " && str[i] != "\t") {
      return(i);
    }
  }
  return(str.length);
}

function defineByLines(lines, start, restOfFirstLine) {
  let indent,
    currentLineIndent,
    end,
    index = start - 1;

  // get the indent of the block
  do {
    index++;
    indent = countLeadingSpaces(lines[index]);
  } while (indent !== lines[index].length);

  start = index;

  do {
    index++;
    currentLineIndent = countLeadingSpaces(lines[index]);
    if (currentLineIndent !== lines[index].length) {
      end = index;
    }
  } while (currentLineIndent === lines[index].length || currentLineIndent >= indent);

  return {start, indent, end, restOfFirstLine};
}

export default {
  defineByLines
}
