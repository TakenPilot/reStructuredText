import block from './block';

function defineByLines(lines, start) {
  const firstLine = lines[0],
    firstLineMatch = firstLine.match(/(.*)\.\. (\W+)::(.*)/);

  if (firstLineMatch) {
    const firstLineIndent = firstLineMatch[1].length,
      name = firstLineMatch[2],
      argument = firstLineMatch[3];

    console.log(__filename, {firstLineIndent, name, argument});

    return {
      name,
      block: block.defineByLines(lines, start + 1, argument)
    };
  } else {
    throw new Error('Not a directive: "' + lines[0] + '"');
  }
}

export default {
  defineByLines
}
