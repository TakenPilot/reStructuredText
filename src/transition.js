import whitespace from './whitespace';

const className = "rst-transition";

function isTransition(sections, index, lines) {
  if (sections[index].length !== 1) {
    return false;
  }

  const line = lines[sections[index].start];

  return whitespace.repeatsFor(line, 0, line.length) && line.length >= 4;
}

function getHTML() {
  return `<hr class="${className}"/>`;
}

export default {
  isTransition,
  getHTML
}
