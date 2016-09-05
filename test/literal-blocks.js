import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

describe('literal-blocks', function () {
  let topic;

  before(function (done) {
    fs.readFile(path.join(__dirname, 'literal-blocks.txt'), {encoding: 'utf8'}, (err, contents) => {
      if (err) return done(err);
      topic = contents;
      done();
    });
  });

  it('gets literal block', function () {
    const result = document.getStructure(topic.split('\n'));

    assert.deepEqual(result, {
      sections: [{start: 0, end: 0, length: 1, indent: 0, type: 'paragraph'},
        {start: 2, end: 2, length: 1, indent: 0, type: 'paragraph'},
        {
          start: 4,
          end: 6,
          length: 3,
          indent: 0,
          type: 'paragraph',
          sections: [
            {start: 4, end: 4, length: 1, indent: 0, type: 'text'},
            {start: 6, end: 6, length: 1, indent: 3, type: 'literalBlock'}
          ]
        },
        {
          start: 8,
          end: 11,
          length: 4,
          indent: 0,
          type: 'paragraph',
          sections: [
            {start: 8, end: 8, length: 1, indent: 0, type: 'text'},
            {start: 10, end: 11, length: 2, indent: 3, type: 'literalBlock'}
          ]
        },
        {
          start: 13,
          end: 19,
          length: 7,
          indent: 0,
          type: 'paragraph',
          sections: [
            {start: 13, end: 13, length: 1, indent: 0, type: 'text'},
            {start: 15, end: 15, length: 1, indent: 3, type: 'literalBlock'},
            {start: 17, end: 17, length: 1, indent: 3, type: 'literalBlock'},
            {start: 19, end: 19, length: 1, indent: 3, type: 'literalBlock'}
          ]
        },
        {start: 21, end: 21, length: 1, indent: 0, type: 'paragraph'},
        {
          start: 23,
          end: 25,
          length: 3,
          indent: 0,
          type: null,
          sections: [
            {start: 23, end: 23, length: 1, indent: 0, type: 'text'},
            {start: 25, end: 25, length: 1, indent: 2, type: 'literalBlock'}
          ]
        }],
      start: 0,
      end: 25,
      length: 26,
      indent: 0
    });
  });

  it('gets HTML', function () {
    const lines = topic.split('\n'),
      structure = document.getStructure(lines),
      html = document.getHTML(structure, lines);

    assert.equal(html, [
    '<p class="rst-paragraph">some words::</p>' +
    '<p class="rst-paragraph">not a literal block</p>' +

    '<p class="rst-paragraph"><span>some words:</span>' +
    '<p class="rst-literal-block">a literal block</p>' +
    '</p>' +

    '<p class="rst-paragraph"><span>some words</span>' +
    '<p class="rst-literal-block">a literal block\nwith multiple lines</p>' +
    '</p>' +

    '<p class="rst-paragraph"><span>some words</span>' +
    '<p class="rst-literal-block">a literal</p>' +
    '<p class="rst-literal-block">block that</p>' +
    '<p class="rst-literal-block">has spaces</p>' +
    '</p>' +

    '<p class="rst-paragraph">parent again</p>'
    ].join(''));
  });
});
