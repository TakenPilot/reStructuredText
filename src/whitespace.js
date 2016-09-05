const adornmentCharacters = [
    '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<',
    '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'
  ],
  bulletCharacters = ['*', '+', '-', '•', '‣', '⁃'];

function isAdornment(char) {
  return adornmentCharacters.indexOf(char) > -1;
}

function isBullet(char) {
  return bulletCharacters.indexOf(char) > -1;
}

function isWhitespace(char) {
  return char !== undefined && (char === ' ' || char === '\t');
}

function countLeadingSpaces(str) {
  for (var i = 0; i < str.length; i++) {
    if (str[i] != " " && str[i] != "\t") {
      return(i);
    }
  }
  return(str.length);
}

function trimRight(str) {
  let end = str.length - 1;

  while (end > 0 && str[end] === ' ' || str[end] === '\t') {
    --end;
  }

  return str.substr(0, end + 1);
}

function repeatsFor(str, start, len) {
  for (let i = start; i < start + len; i++) {
    if (str[i] !== str[start]) {
      return false;
    }
  }

  return true;
}

function getFirstNonSpaceIndex(str, start) {
  start = start || 0;

  for (let i = start; i < str.length; i++) {
    if (str[i] !== undefined && !isWhitespace(str[i])) {
      return i;
    }
  }

  return -1;
}

function getFirstNonBlankLineIndex(lines, start, end) {
  start = start || 0;
  end = end === undefined ? lines.length : end;

  while (start < end) {
    if (lines[start].length !== 0) {
      return start;
    }
    start++;
  }

  return -1;
}

function getLastLineWithIndentIndex(lines, indent, start, end) {
  start = start || 0;
  end = end === undefined ? lines.length : end;

  for (let i = end - 1; i >= start; i--) {
    const len = lines[i].length;

    if (len > 0 && len >= indent && countLeadingSpaces(lines[i]) === indent) {
      return i;
    }
  }

  return -1;
}

export default {
  isAdornment,
  isBullet,
  isWhitespace,
  countLeadingSpaces,
  getFirstNonSpaceIndex,
  getFirstNonBlankLineIndex,
  getLastLineWithIndentIndex,
  trimRight,
  repeatsFor
}
