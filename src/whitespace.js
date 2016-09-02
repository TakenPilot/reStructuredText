const adornmentCharacters = [
  '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<',
  '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'
];

function isAdornment(char) {
  return adornmentCharacters.indexOf(char) > -1;
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

export default {
  isAdornment,
  countLeadingSpaces,
  trimRight,
  repeatsFor
}
